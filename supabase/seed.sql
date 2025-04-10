-- Seed script to create test users for each role

-- Function to create users with auth and public profiles
CREATE OR REPLACE FUNCTION create_test_user(email TEXT, password TEXT, role user_role, full_name TEXT)
RETURNS uuid AS $$
DECLARE
  user_id uuid;
BEGIN
  -- Generate a UUID for the user
  user_id := extensions.uuid_generate_v4();
  
  -- Insert into auth.users
  INSERT INTO auth.users 
  (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at)
  VALUES (
    user_id,
    '00000000-0000-0000-0000-000000000000',
    email,
    crypt(password, gen_salt('bf')),
    now(),
    jsonb_build_object('provider', 'email', 'providers', ARRAY['email']),
    jsonb_build_object('full_name', full_name),
    now()
  );
  
  -- Insert into public.users manually
  INSERT INTO public.users (id, email, full_name, role, created_at, updated_at)
  VALUES (user_id, email, full_name, role, now(), now());
  
  -- Insert into user_settings manually
  INSERT INTO public.user_settings (user_id, role, created_at)
  VALUES (user_id, role::text, now())
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create test users
SELECT create_test_user('user@example.com', 'user123', 'user', 'Regular User');
SELECT create_test_user('admin@example.com', 'admin123', 'admin', 'Admin User');
SELECT create_test_user('superadmin@example.com', 'super123', 'superadmin', 'Super Admin');
SELECT create_test_user('affiliate@example.com', 'affiliate123', 'affiliate', 'Affiliate User');

-- Drop the function after use
DROP FUNCTION IF EXISTS create_test_user;

-- Output the created users (this won't actually show in the output, but documents what was created)
/*
Created users:
1. Regular User
   - Email: user@example.com
   - Password: user123
   - Role: user

2. Admin User
   - Email: admin@example.com
   - Password: admin123
   - Role: admin

3. Super Admin
   - Email: superadmin@example.com
   - Password: super123
   - Role: superadmin

4. Affiliate User
   - Email: affiliate@example.com
   - Password: affiliate123
   - Role: affiliate
*/
