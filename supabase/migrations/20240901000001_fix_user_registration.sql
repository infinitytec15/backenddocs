-- Fix user registration by ensuring the handle_new_user function works correctly
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role_id)
  VALUES (NEW.id, NEW.email, '', '', 1)
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO public.user_settings (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Make sure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Ensure the roles table has the default roles
INSERT INTO roles (id, name, description) 
VALUES 
  (1, 'user', 'Regular user with basic access'),
  (2, 'admin', 'Administrator with elevated privileges'),
  (3, 'superadmin', 'Super administrator with full access')
ON CONFLICT (id) DO NOTHING;
