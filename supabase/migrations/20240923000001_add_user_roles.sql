-- Create user_role enum type if it doesn't exist already
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('user', 'affiliate', 'admin', 'superadmin');
  END IF;
END $$;

-- Add role column to users table if it doesn't exist
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'user';

-- Add is_affiliate column if it doesn't exist (for backward compatibility)
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS is_affiliate BOOLEAN DEFAULT false;

-- Create trigger to sync is_affiliate with role
CREATE OR REPLACE FUNCTION sync_affiliate_role()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'affiliate' THEN
    NEW.is_affiliate := true;
  END IF;
  
  IF NEW.is_affiliate = true AND NEW.role = 'user' THEN
    NEW.role := 'affiliate';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS sync_affiliate_role_trigger ON public.users;
CREATE TRIGGER sync_affiliate_role_trigger
BEFORE INSERT OR UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION sync_affiliate_role();

-- Enable row level security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
CREATE POLICY "Users can view their own data"
ON public.users
FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
CREATE POLICY "Admins can view all users"
ON public.users
FOR SELECT
USING (auth.jwt() ->> 'role' IN ('admin', 'superadmin'));

DROP POLICY IF EXISTS "Superadmins can manage all users" ON public.users;
CREATE POLICY "Superadmins can manage all users"
ON public.users
FOR ALL
USING (auth.jwt() ->> 'role' = 'superadmin');

-- Realtime support is already enabled for users table
-- No need to add it again
