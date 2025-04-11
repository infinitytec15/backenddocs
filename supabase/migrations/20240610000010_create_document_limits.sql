-- Create document limits table
CREATE TABLE IF NOT EXISTS document_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID NOT NULL REFERENCES plans(id),
  max_documents INTEGER NOT NULL DEFAULT 10,
  max_contracts INTEGER NOT NULL DEFAULT 5,
  max_storage_bytes BIGINT NOT NULL DEFAULT 1073741824, -- 1GB in bytes
  max_document_size_bytes INTEGER NOT NULL DEFAULT 10485760, -- 10MB in bytes
  max_contract_size_bytes INTEGER NOT NULL DEFAULT 10485760, -- 10MB in bytes
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default document limits for plans
INSERT INTO document_limits (plan_id, max_documents, max_contracts, max_storage_bytes, max_document_size_bytes, max_contract_size_bytes)
SELECT 
  id,
  CASE 
    WHEN name LIKE '%Basic%' THEN 50
    WHEN name LIKE '%Pro%' THEN 200
    WHEN name LIKE '%Business%' THEN 500
    WHEN name LIKE '%Enterprise%' THEN 1000
    ELSE 10
  END as max_documents,
  CASE 
    WHEN name LIKE '%Basic%' THEN 20
    WHEN name LIKE '%Pro%' THEN 100
    WHEN name LIKE '%Business%' THEN 300
    WHEN name LIKE '%Enterprise%' THEN 500
    ELSE 5
  END as max_contracts,
  CASE 
    WHEN name LIKE '%Basic%' THEN 5368709120 -- 5GB
    WHEN name LIKE '%Pro%' THEN 21474836480 -- 20GB
    WHEN name LIKE '%Business%' THEN 107374182400 -- 100GB
    WHEN name LIKE '%Enterprise%' THEN 1099511627776 -- 1TB
    ELSE 1073741824 -- 1GB
  END as max_storage_bytes,
  CASE 
    WHEN name LIKE '%Basic%' THEN 20971520 -- 20MB
    WHEN name LIKE '%Pro%' THEN 52428800 -- 50MB
    WHEN name LIKE '%Business%' THEN 104857600 -- 100MB
    WHEN name LIKE '%Enterprise%' THEN 209715200 -- 200MB
    ELSE 10485760 -- 10MB
  END as max_document_size_bytes,
  CASE 
    WHEN name LIKE '%Basic%' THEN 20971520 -- 20MB
    WHEN name LIKE '%Pro%' THEN 52428800 -- 50MB
    WHEN name LIKE '%Business%' THEN 104857600 -- 100MB
    WHEN name LIKE '%Enterprise%' THEN 209715200 -- 200MB
    ELSE 10485760 -- 10MB
  END as max_contract_size_bytes
FROM plans
ON CONFLICT DO NOTHING;

-- Add realtime publication
alter publication supabase_realtime add table document_limits;

-- Create RLS policies for document_limits
DROP POLICY IF EXISTS "Users can view document limits" ON document_limits;
CREATE POLICY "Users can view document limits"
  ON document_limits FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Only admins can modify document limits" ON document_limits;
CREATE POLICY "Only admins can modify document limits"
  ON document_limits FOR ALL
  USING ((SELECT role FROM user_settings WHERE user_id = auth.uid()) IN ('admin', 'superadmin'));

-- Create function to check if user is within document limits
CREATE OR REPLACE FUNCTION check_user_document_limits(p_user_id UUID, p_document_type TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_plan_id UUID;
  v_max_documents INTEGER;
  v_max_contracts INTEGER;
  v_current_documents INTEGER;
  v_current_contracts INTEGER;
BEGIN
  -- Get user's active plan
  SELECT plan_id INTO v_plan_id
  FROM user_plans
  WHERE user_id = p_user_id
    AND status = 'active'
    AND start_date <= NOW()
    AND (end_date IS NULL OR end_date >= NOW())
  ORDER BY end_date DESC NULLS FIRST
  LIMIT 1;
  
  IF v_plan_id IS NULL THEN
    RETURN FALSE; -- No active plan
  END IF;
  
  -- Get plan limits
  IF p_document_type = 'document' THEN
    SELECT max_documents INTO v_max_documents
    FROM document_limits
    WHERE plan_id = v_plan_id;
    
    -- Count user's documents
    SELECT COUNT(DISTINCT document_id) INTO v_current_documents
    FROM document_versions
    WHERE created_by = p_user_id;
    
    RETURN v_current_documents < v_max_documents;
  ELSIF p_document_type = 'contract' THEN
    SELECT max_contracts INTO v_max_contracts
    FROM document_limits
    WHERE plan_id = v_plan_id;
    
    -- Count user's contracts
    SELECT COUNT(*) INTO v_current_contracts
    FROM contracts
    WHERE created_by = p_user_id;
    
    RETURN v_current_contracts < v_max_contracts;
  END IF;
  
  RETURN FALSE; -- Unknown document type
END;
$$;

-- Create function to get user's document limits
CREATE OR REPLACE FUNCTION get_user_document_limits(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_plan_id UUID;
  v_limits JSONB;
  v_current_documents INTEGER;
  v_current_contracts INTEGER;
  v_current_storage_bytes BIGINT;
BEGIN
  -- Get user's active plan
  SELECT plan_id INTO v_plan_id
  FROM user_plans
  WHERE user_id = p_user_id
    AND status = 'active'
    AND start_date <= NOW()
    AND (end_date IS NULL OR end_date >= NOW())
  ORDER BY end_date DESC NULLS FIRST
  LIMIT 1;
  
  IF v_plan_id IS NULL THEN
    RETURN jsonb_build_object(
      'has_active_plan', false,
      'plan_id', NULL,
      'limits', NULL,
      'usage', NULL
    );
  END IF;
  
  -- Get plan limits
  SELECT jsonb_build_object(
    'max_documents', max_documents,
    'max_contracts', max_contracts,
    'max_storage_bytes', max_storage_bytes,
    'max_document_size_bytes', max_document_size_bytes,
    'max_contract_size_bytes', max_contract_size_bytes
  ) INTO v_limits
  FROM document_limits
  WHERE plan_id = v_plan_id;
  
  -- Count user's documents
  SELECT COUNT(DISTINCT document_id) INTO v_current_documents
  FROM document_versions
  WHERE created_by = p_user_id;
  
  -- Count user's contracts
  SELECT COUNT(*) INTO v_current_contracts
  FROM contracts
  WHERE created_by = p_user_id;
  
  -- Calculate storage usage
  SELECT COALESCE(SUM(file_size), 0) INTO v_current_storage_bytes
  FROM document_versions
  WHERE created_by = p_user_id;
  
  RETURN jsonb_build_object(
    'has_active_plan', true,
    'plan_id', v_plan_id,
    'limits', v_limits,
    'usage', jsonb_build_object(
      'documents', v_current_documents,
      'contracts', v_current_contracts,
      'storage_bytes', v_current_storage_bytes
    )
  );
END;
$$;