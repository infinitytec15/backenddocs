-- Check if the trigger exists and drop it if it does
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created_settings') THEN
    DROP TRIGGER IF EXISTS on_auth_user_created_settings ON auth.users;
  END IF;
END
$$;

-- Check if the function exists and drop it if it does
DROP FUNCTION IF EXISTS public.create_user_settings_for_new_user();

-- Create or replace the function
CREATE OR REPLACE FUNCTION public.create_user_settings_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_settings (user_id, role, created_at)
    VALUES (NEW.id, 'user', NOW())
    ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if the trigger already exists and create it if it doesn't
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created_settings') THEN
    CREATE TRIGGER on_auth_user_created_settings
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.create_user_settings_for_new_user();
  END IF;
END
$$;

-- Check if the table is already in the publication before adding it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'user_settings'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.user_settings;
  END IF;
END
$$;