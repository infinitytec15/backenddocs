-- Create roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default roles if they don't exist
INSERT INTO roles (name, description, permissions)
VALUES 
  ('user', 'Regular user with basic permissions', '{"documents": {"create": true, "read": true, "update": true, "delete": true}, "contracts": {"create": true, "read": true, "update": true, "delete": true}, "storage": {"max_size": 1073741824}}'::jsonb),
  ('admin', 'Administrator with elevated permissions', '{"documents": {"create": true, "read": true, "update": true, "delete": true}, "contracts": {"create": true, "read": true, "update": true, "delete": true}, "users": {"read": true, "update": true}, "plans": {"read": true}, "storage": {"max_size": 5368709120}}'::jsonb),
  ('superadmin', 'Super administrator with full access', '{"documents": {"create": true, "read": true, "update": true, "delete": true}, "contracts": {"create": true, "read": true, "update": true, "delete": true}, "users": {"create": true, "read": true, "update": true, "delete": true}, "plans": {"create": true, "read": true, "update": true, "delete": true}, "storage": {"max_size": -1}}'::jsonb),
  ('affiliate', 'Affiliate partner with limited access', '{"documents": {"create": false, "read": false, "update": false, "delete": false}, "contracts": {"create": false, "read": false, "update": false, "delete": false}, "affiliate": {"dashboard": true, "referrals": true, "withdrawals": true}, "storage": {"max_size": 104857600}}'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- Add realtime publication
alter publication supabase_realtime add table roles;

-- Create RLS policies for roles
DROP POLICY IF EXISTS "Users can view roles" ON roles;
CREATE POLICY "Users can view roles"
  ON roles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Only superadmins can modify roles" ON roles;
CREATE POLICY "Only superadmins can modify roles"
  ON roles FOR ALL
  USING ((SELECT role FROM user_settings WHERE user_id = auth.uid()) = 'superadmin');

-- Create function to check user permissions
CREATE OR REPLACE FUNCTION check_user_permission(p_user_id UUID, p_resource TEXT, p_action TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_role_name TEXT;
  v_permissions JSONB;
  v_has_permission BOOLEAN;
BEGIN
  -- Get user's role
  SELECT role INTO v_role_name
  FROM user_settings
  WHERE user_id = p_user_id;
  
  IF v_role_name IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Get role's permissions
  SELECT permissions INTO v_permissions
  FROM roles
  WHERE name = v_role_name;
  
  IF v_permissions IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Check if user has the specific permission
  v_has_permission := v_permissions->p_resource->p_action;
  
  RETURN COALESCE(v_has_permission, FALSE);
END;
$$;

-- Create function to get user's storage limit
CREATE OR REPLACE FUNCTION get_user_storage_limit(p_user_id UUID)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_role_name TEXT;
  v_storage_limit BIGINT;
BEGIN
  -- Get user's role
  SELECT role INTO v_role_name
  FROM user_settings
  WHERE user_id = p_user_id;
  
  IF v_role_name IS NULL THEN
    RETURN 0;
  END IF;
  
  -- Get role's storage limit
  SELECT (permissions->'storage'->>'max_size')::BIGINT INTO v_storage_limit
  FROM roles
  WHERE name = v_role_name;
  
  RETURN COALESCE(v_storage_limit, 0);
END;
$$;

-- Create function to check if user is within storage limits
CREATE OR REPLACE FUNCTION is_user_within_storage_limit(p_user_id UUID, p_additional_bytes BIGINT DEFAULT 0)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_storage_limit BIGINT;
  v_current_usage BIGINT;
BEGIN
  -- Get user's storage limit
  v_storage_limit := get_user_storage_limit(p_user_id);
  
  -- If limit is -1, user has unlimited storage
  IF v_storage_limit = -1 THEN
    RETURN TRUE;
  END IF;
  
  -- Calculate current storage usage
  SELECT COALESCE(SUM(file_size), 0) INTO v_current_usage
  FROM document_versions
  WHERE created_by = p_user_id;
  
  -- Check if user is within limits
  RETURN (v_current_usage + p_additional_bytes) <= v_storage_limit;
END;
$$;