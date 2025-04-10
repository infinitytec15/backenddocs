-- Create roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default roles if they don't exist
INSERT INTO roles (name, description)
VALUES 
  ('user', 'Regular user with basic access'),
  ('admin', 'Administrator with elevated privileges'),
  ('superadmin', 'Super administrator with full access')
ON CONFLICT (name) DO NOTHING;

-- Enable row level security
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Admins can read roles" ON roles;
CREATE POLICY "Admins can read roles"
  ON roles FOR SELECT
  USING (auth.jwt() ->> 'role' IN ('admin', 'superadmin'));

DROP POLICY IF EXISTS "Superadmins can insert/update/delete roles" ON roles;
CREATE POLICY "Superadmins can insert/update/delete roles"
  ON roles FOR ALL
  USING (auth.jwt() ->> 'role' = 'superadmin');

-- Add to realtime publication
alter publication supabase_realtime add table roles;
