-- Create document shares table
CREATE TABLE IF NOT EXISTS document_shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL,
  shared_by UUID NOT NULL REFERENCES auth.users(id),
  shared_with UUID NOT NULL REFERENCES auth.users(id),
  file_path TEXT NOT NULL,
  permissions VARCHAR(20) NOT NULL DEFAULT 'view', -- view, edit, comment
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT different_users CHECK (shared_by <> shared_with)
);

-- Add realtime publication
alter publication supabase_realtime add table document_shares;

-- Create RLS policies for document_shares
DROP POLICY IF EXISTS "Users can view their document shares" ON document_shares;
CREATE POLICY "Users can view their document shares"
  ON document_shares FOR SELECT
  USING (shared_by = auth.uid() OR shared_with = auth.uid());

DROP POLICY IF EXISTS "Users can create document shares" ON document_shares;
CREATE POLICY "Users can create document shares"
  ON document_shares FOR INSERT
  WITH CHECK (shared_by = auth.uid());

DROP POLICY IF EXISTS "Users can update their document shares" ON document_shares;
CREATE POLICY "Users can update their document shares"
  ON document_shares FOR UPDATE
  USING (shared_by = auth.uid());

DROP POLICY IF EXISTS "Users can delete their document shares" ON document_shares;
CREATE POLICY "Users can delete their document shares"
  ON document_shares FOR DELETE
  USING (shared_by = auth.uid());

-- Create function to check document access permissions
CREATE OR REPLACE FUNCTION check_document_access(p_document_id UUID, p_user_id UUID, p_required_permission VARCHAR DEFAULT 'view')
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_document_owner UUID;
  v_share_record RECORD;
BEGIN
  -- Check if user is the document owner
  SELECT created_by INTO v_document_owner
  FROM document_versions
  WHERE document_id = p_document_id
  ORDER BY version_number DESC
  LIMIT 1;
  
  IF v_document_owner = p_user_id THEN
    RETURN TRUE;
  END IF;
  
  -- Check if document is shared with the user with sufficient permissions
  SELECT * INTO v_share_record
  FROM document_shares
  WHERE document_id = p_document_id
    AND shared_with = p_user_id
    AND is_active = TRUE
    AND (expires_at IS NULL OR expires_at > NOW())
  LIMIT 1;
  
  IF v_share_record.id IS NOT NULL THEN
    -- Check permission levels
    IF p_required_permission = 'view' THEN
      RETURN TRUE; -- Any permission level allows viewing
    ELSIF p_required_permission = 'comment' AND v_share_record.permissions IN ('edit', 'comment') THEN
      RETURN TRUE; -- Edit or comment permission allows commenting
    ELSIF p_required_permission = 'edit' AND v_share_record.permissions = 'edit' THEN
      RETURN TRUE; -- Only edit permission allows editing
    END IF;
  END IF;
  
  RETURN FALSE;
END;
$$;