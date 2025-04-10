-- Add a unique constraint to user_settings if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'user_settings_user_id_key' 
        AND conrelid = 'public.user_settings'::regclass
    ) THEN
        ALTER TABLE public.user_settings ADD CONSTRAINT user_settings_user_id_key UNIQUE (user_id);
    END IF;
END
$$;