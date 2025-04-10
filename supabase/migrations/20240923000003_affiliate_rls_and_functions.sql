-- Create affiliate_withdrawals table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.affiliate_withdrawals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    affiliate_id UUID NOT NULL REFERENCES public.affiliates(id),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    payment_method VARCHAR(50) NOT NULL,
    payment_details JSONB NOT NULL,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    processed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row level security on affiliate tables
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_withdrawals ENABLE ROW LEVEL SECURITY;

-- Affiliate policies
-- Affiliates can view and update their own data
DROP POLICY IF EXISTS "Affiliates can view their own data" ON public.affiliates;
CREATE POLICY "Affiliates can view their own data"
ON public.affiliates
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Affiliates can update their own data" ON public.affiliates;
CREATE POLICY "Affiliates can update their own data"
ON public.affiliates
FOR UPDATE
USING (auth.uid() = user_id);

-- Admins can view all affiliate data
DROP POLICY IF EXISTS "Admins can view all affiliate data" ON public.affiliates;
CREATE POLICY "Admins can view all affiliate data"
ON public.affiliates
FOR SELECT
USING (auth.jwt() ->> 'role' IN ('admin', 'superadmin'));

-- Superadmins can manage all affiliate data
DROP POLICY IF EXISTS "Superadmins can manage all affiliate data" ON public.affiliates;
CREATE POLICY "Superadmins can manage all affiliate data"
ON public.affiliates
FOR ALL
USING (auth.jwt() ->> 'role' = 'superadmin');

-- Affiliate transactions policies
-- Affiliates can view their own transactions
DROP POLICY IF EXISTS "Affiliates can view their own transactions" ON public.affiliate_transactions;
CREATE POLICY "Affiliates can view their own transactions"
ON public.affiliate_transactions
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.affiliates
  WHERE affiliates.id = affiliate_transactions.affiliate_id
  AND affiliates.user_id = auth.uid()
));

-- Admins can view all transactions
DROP POLICY IF EXISTS "Admins can view all transactions" ON public.affiliate_transactions;
CREATE POLICY "Admins can view all transactions"
ON public.affiliate_transactions
FOR SELECT
USING (auth.jwt() ->> 'role' IN ('admin', 'superadmin'));

-- Superadmins can manage all transactions
DROP POLICY IF EXISTS "Superadmins can manage all transactions" ON public.affiliate_transactions;
CREATE POLICY "Superadmins can manage all transactions"
ON public.affiliate_transactions
FOR ALL
USING (auth.jwt() ->> 'role' = 'superadmin');

-- Affiliate withdrawals policies
-- Affiliates can view and request their own withdrawals
DROP POLICY IF EXISTS "Affiliates can view their own withdrawals" ON public.affiliate_withdrawals;
CREATE POLICY "Affiliates can view their own withdrawals"
ON public.affiliate_withdrawals
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.affiliates
  WHERE affiliates.id = affiliate_withdrawals.affiliate_id
  AND affiliates.user_id = auth.uid()
));

DROP POLICY IF EXISTS "Affiliates can request withdrawals" ON public.affiliate_withdrawals;
CREATE POLICY "Affiliates can request withdrawals"
ON public.affiliate_withdrawals
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.affiliates
  WHERE affiliates.id = affiliate_withdrawals.affiliate_id
  AND affiliates.user_id = auth.uid()
));

-- Admins can view all withdrawals
DROP POLICY IF EXISTS "Admins can view all withdrawals" ON public.affiliate_withdrawals;
CREATE POLICY "Admins can view all withdrawals"
ON public.affiliate_withdrawals
FOR SELECT
USING (auth.jwt() ->> 'role' IN ('admin', 'superadmin'));

-- Superadmins can manage all withdrawals
DROP POLICY IF EXISTS "Superadmins can manage all withdrawals" ON public.affiliate_withdrawals;
CREATE POLICY "Superadmins can manage all withdrawals"
ON public.affiliate_withdrawals
FOR ALL
USING (auth.jwt() ->> 'role' = 'superadmin');

-- Add realtime support for affiliate tables (only if not already added)
DO $$
BEGIN
  -- Check if tables are already in the publication before adding them
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'affiliates'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.affiliates';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'affiliate_transactions'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.affiliate_transactions';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'affiliate_withdrawals'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.affiliate_withdrawals';
  END IF;
END
$$;