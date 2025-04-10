-- Add signup_date column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS signup_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Update existing users to have a signup_date if they don't already
UPDATE public.users SET signup_date = created_at WHERE signup_date IS NULL;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_users_signup_date ON public.users(signup_date);
