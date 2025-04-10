-- Create an enum type for user roles
CREATE TYPE public.user_role AS ENUM ('user', 'admin', 'superadmin');

-- Add role column to user_settings table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'user_settings' 
        AND column_name = 'role'
    ) THEN
        ALTER TABLE public.user_settings 
        DROP COLUMN IF EXISTS role,
        ADD COLUMN role user_role NOT NULL DEFAULT 'user';
    END IF;
END $$;

-- Create function to check if user has admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    _role user_role;
BEGIN
    SELECT role INTO _role FROM public.user_settings WHERE user_id = auth.uid();
    RETURN _role IN ('admin', 'superadmin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user has superadmin role
CREATE OR REPLACE FUNCTION public.is_superadmin()
RETURNS BOOLEAN AS $$
DECLARE
    _role user_role;
BEGIN
    SELECT role INTO _role FROM public.user_settings WHERE user_id = auth.uid();
    RETURN _role = 'superadmin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies for user_settings to allow admins to view all user settings
DROP POLICY IF EXISTS "User settings are viewable by individual users" ON public.user_settings;
CREATE POLICY "User settings are viewable by individual users or admins"
ON public.user_settings
FOR SELECT
USING (auth.uid() = user_id OR public.is_admin());

-- Update RLS policies for user_settings to allow only superadmins to update roles
DROP POLICY IF EXISTS "User settings are updatable by individual users" ON public.user_settings;
CREATE POLICY "User settings are updatable by individual users"
ON public.user_settings
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "User roles are updatable by superadmins"
ON public.user_settings
FOR UPDATE
USING (public.is_superadmin())
WITH CHECK (public.is_superadmin());

-- Create a trigger to ensure a user_settings record exists for each new user
CREATE OR REPLACE FUNCTION public.create_user_settings_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_settings (user_id, role, created_at)
    VALUES (NEW.id, 'user', NOW())
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.create_user_settings_for_new_user();