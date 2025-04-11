-- Fix referrals table if needed
DO $$
BEGIN
    -- Check if the referrals table exists
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'referrals') THEN
        -- Create the referrals table
        CREATE TABLE public.referrals (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            referred_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            referral_code VARCHAR(50) NOT NULL,
            status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired')),
            plan_id UUID REFERENCES public.plans(id) ON DELETE SET NULL,
            commission_paid BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            UNIQUE(referred_user_id)
        );

        -- Add to realtime publication
        ALTER PUBLICATION supabase_realtime ADD TABLE public.referrals;

        -- Add RLS policies
        ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

        -- Policy for users to view their own referrals as referrer
        CREATE POLICY "Users can view their own referrals as referrer"
            ON public.referrals
            FOR SELECT
            USING (auth.uid() = referrer_id);

        -- Policy for admins to manage all referrals
        CREATE POLICY "Admins can manage all referrals"
            ON public.referrals
            USING (
                EXISTS (
                    SELECT 1 FROM public.user_settings
                    WHERE user_id = auth.uid()
                    AND (role = 'admin' OR role = 'superadmin')
                )
            );
    END IF;

    -- Add commission_rate column to plans table if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'plans' 
        AND column_name = 'commission_rate'
    ) THEN
        ALTER TABLE public.plans ADD COLUMN commission_rate DECIMAL(5, 2) DEFAULT 10.00;
    END IF;
END
$$;
