-- Fix user_settings table structure and add trigger for new users

-- Ensure user_settings table has all required fields
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'user_settings' 
                   AND column_name = 'theme') THEN
        ALTER TABLE public.user_settings ADD COLUMN theme VARCHAR(50) DEFAULT 'light';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'user_settings' 
                   AND column_name = 'language') THEN
        ALTER TABLE public.user_settings ADD COLUMN language VARCHAR(10) DEFAULT 'pt-BR';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'user_settings' 
                   AND column_name = 'notifications_enabled') THEN
        ALTER TABLE public.user_settings ADD COLUMN notifications_enabled BOOLEAN DEFAULT true;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'user_settings' 
                   AND column_name = 'updated_at') THEN
        ALTER TABLE public.user_settings ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
    END IF;
END
$$;

-- Create or replace the function to handle new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert into public.users table
    INSERT INTO public.users (id, email, full_name, signup_date)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        now()
    )
    ON CONFLICT (id) DO NOTHING;
    
    -- Insert into user_settings
    INSERT INTO public.user_settings (user_id, role, created_at, theme, language, notifications_enabled)
    VALUES (
        NEW.id,
        'user',
        now(),
        'light',
        'pt-BR',
        true
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure the trigger exists with correct function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fix any existing users without user_settings
INSERT INTO public.user_settings (user_id, role, created_at, theme, language, notifications_enabled)
SELECT id, 'user', now(), 'light', 'pt-BR', true FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_settings)
ON CONFLICT (user_id) DO NOTHING;

-- Fix any existing auth users without entries in the users table
INSERT INTO public.users (id, email, full_name, signup_date)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', ''), now() FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users)
ON CONFLICT (id) DO NOTHING;
