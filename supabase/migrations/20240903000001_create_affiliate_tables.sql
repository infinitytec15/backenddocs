-- Create affiliates table
CREATE TABLE IF NOT EXISTS public.affiliates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  balance DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
  total_earned DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
  total_referrals INTEGER DEFAULT 0 NOT NULL,
  payout_method JSONB DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- Create affiliate_transactions table
CREATE TABLE IF NOT EXISTS public.affiliate_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  transaction_type VARCHAR(20) NOT NULL, -- 'commission', 'payout', 'adjustment'
  status VARCHAR(20) NOT NULL, -- 'pending', 'completed', 'failed'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  metadata JSONB DEFAULT NULL
);

-- Add is_affiliate column to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS is_affiliate BOOLEAN DEFAULT false;

-- Add affiliate_code column to users table to track which affiliate referred this user
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS referred_by VARCHAR(20) DEFAULT NULL;

-- Add affiliate role to roles table if it doesn't exist
INSERT INTO public.roles (name, description)
VALUES ('affiliate', 'Affiliate user with access to affiliate dashboard')
ON CONFLICT (name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_affiliates_user_id ON public.affiliates(user_id);
CREATE INDEX IF NOT EXISTS idx_affiliates_referral_code ON public.affiliates(referral_code);
CREATE INDEX IF NOT EXISTS idx_affiliate_transactions_affiliate_id ON public.affiliate_transactions(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_users_referred_by ON public.users(referred_by);

-- Enable RLS on the new tables
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Affiliates can view their own data
DROP POLICY IF EXISTS "Affiliates can view their own data" ON public.affiliates;
CREATE POLICY "Affiliates can view their own data"
ON public.affiliates
FOR SELECT
USING (auth.uid() = user_id);

-- Affiliates can view their own transactions
DROP POLICY IF EXISTS "Affiliates can view their own transactions" ON public.affiliate_transactions;
CREATE POLICY "Affiliates can view their own transactions"
ON public.affiliate_transactions
FOR SELECT
USING (affiliate_id IN (SELECT id FROM public.affiliates WHERE user_id = auth.uid()));

-- Enable realtime for these tables
alter publication supabase_realtime add table affiliates;
alter publication supabase_realtime add table affiliate_transactions;
