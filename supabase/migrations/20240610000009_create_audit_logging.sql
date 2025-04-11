-- Create activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  activity_type VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(50),
  user_agent TEXT,
  metadata JSONB
);

-- Create security logs table
CREATE TABLE IF NOT EXISTS security_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  event_type VARCHAR(50) NOT NULL, -- login, logout, failed_login, password_change, etc.
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(50),
  user_agent TEXT,
  location VARCHAR(100),
  success BOOLEAN NOT NULL DEFAULT true,
  details TEXT
);

-- Create system logs table
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  log_level VARCHAR(20) NOT NULL, -- info, warning, error, critical
  component VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  details JSONB,
  error_code VARCHAR(50),
  stack_trace TEXT
);

-- Create data vault table for sensitive operations
CREATE TABLE IF NOT EXISTS data_vault (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  operation_type VARCHAR(50) NOT NULL,
  table_name VARCHAR(50) NOT NULL,
  record_id UUID NOT NULL,
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(50),
  reason TEXT
);

-- Add realtime publication
alter publication supabase_realtime add table activity_logs;
alter publication supabase_realtime add table security_logs;
alter publication supabase_realtime add table system_logs;
alter publication supabase_realtime add table data_vault;

-- Create RLS policies for activity_logs
DROP POLICY IF EXISTS "Users can view their activity logs" ON activity_logs;
CREATE POLICY "Users can view their activity logs"
  ON activity_logs FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all activity logs" ON activity_logs;
CREATE POLICY "Admins can view all activity logs"
  ON activity_logs FOR SELECT
  USING ((SELECT role FROM user_settings WHERE user_id = auth.uid()) IN ('admin', 'superadmin'));

DROP POLICY IF EXISTS "System can insert activity logs" ON activity_logs;
CREATE POLICY "System can insert activity logs"
  ON activity_logs FOR INSERT
  WITH CHECK (true);

-- Create RLS policies for security_logs
DROP POLICY IF EXISTS "Users can view their security logs" ON security_logs;
CREATE POLICY "Users can view their security logs"
  ON security_logs FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all security logs" ON security_logs;
CREATE POLICY "Admins can view all security logs"
  ON security_logs FOR SELECT
  USING ((SELECT role FROM user_settings WHERE user_id = auth.uid()) IN ('admin', 'superadmin'));

DROP POLICY IF EXISTS "System can insert security logs" ON security_logs;
CREATE POLICY "System can insert security logs"
  ON security_logs FOR INSERT
  WITH CHECK (true);

-- Create RLS policies for system_logs
DROP POLICY IF EXISTS "Only admins can view system logs" ON system_logs;
CREATE POLICY "Only admins can view system logs"
  ON system_logs FOR SELECT
  USING ((SELECT role FROM user_settings WHERE user_id = auth.uid()) IN ('admin', 'superadmin'));

DROP POLICY IF EXISTS "System can insert system logs" ON system_logs;
CREATE POLICY "System can insert system logs"
  ON system_logs FOR INSERT
  WITH CHECK (true);

-- Create RLS policies for data_vault
DROP POLICY IF EXISTS "Only superadmins can view data vault" ON data_vault;
CREATE POLICY "Only superadmins can view data vault"
  ON data_vault FOR SELECT
  USING ((SELECT role FROM user_settings WHERE user_id = auth.uid()) = 'superadmin');

DROP POLICY IF EXISTS "System can insert data vault records" ON data_vault;
CREATE POLICY "System can insert data vault records"
  ON data_vault FOR INSERT
  WITH CHECK (true);

-- Create function to log data changes
CREATE OR REPLACE FUNCTION log_data_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO data_vault (operation_type, table_name, record_id, old_data, user_id)
    VALUES ('DELETE', TG_TABLE_NAME, OLD.id, row_to_json(OLD), auth.uid());
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO data_vault (operation_type, table_name, record_id, old_data, new_data, user_id)
    VALUES ('UPDATE', TG_TABLE_NAME, NEW.id, row_to_json(OLD), row_to_json(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO data_vault (operation_type, table_name, record_id, new_data, user_id)
    VALUES ('INSERT', TG_TABLE_NAME, NEW.id, row_to_json(NEW), auth.uid());
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$;

-- Create triggers for sensitive tables
CREATE TRIGGER log_user_settings_changes
  AFTER INSERT OR UPDATE OR DELETE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION log_data_change();

CREATE TRIGGER log_payment_methods_changes
  AFTER INSERT OR UPDATE OR DELETE ON payment_methods
  FOR EACH ROW EXECUTE FUNCTION log_data_change();

CREATE TRIGGER log_contracts_changes
  AFTER INSERT OR UPDATE OR DELETE ON contracts
  FOR EACH ROW EXECUTE FUNCTION log_data_change();