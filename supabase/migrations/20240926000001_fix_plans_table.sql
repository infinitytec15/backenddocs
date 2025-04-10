-- First, drop the existing plans table if it exists
DROP TABLE IF EXISTS plans CASCADE;

-- Create plans table with the correct structure
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  interval VARCHAR(50) NOT NULL,
  features JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE plans;

-- Create RLS policy for plans table
DROP POLICY IF EXISTS "Plans are viewable by everyone" ON plans;
CREATE POLICY "Plans are viewable by everyone"
ON plans FOR SELECT
USING (true);

-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policy for plans table (only admins can modify)
DROP POLICY IF EXISTS "Plans are editable by admins" ON plans;
CREATE POLICY "Plans are editable by admins"
ON plans FOR ALL
USING (
  auth.uid() IN (
    SELECT user_id FROM user_roles WHERE role = 'admin' OR role = 'superadmin'
  )
);

-- Enable RLS on plans table
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;