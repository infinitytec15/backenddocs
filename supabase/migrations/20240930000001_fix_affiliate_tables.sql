-- Ensure uuid-ossp extension is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create referrals table if it doesn't exist yet
DROP TABLE IF EXISTS affiliate_transactions;
DROP TABLE IF EXISTS affiliate_withdrawals;
DROP TABLE IF EXISTS affiliate_balances;
DROP TABLE IF EXISTS referrals;

CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID NOT NULL REFERENCES users(id),
  referred_id UUID REFERENCES users(id),
  referral_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  commission_rate DECIMAL(5,2) NOT NULL DEFAULT 10.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referral_code)
);

-- Create affiliate_transactions table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS affiliate_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID NOT NULL REFERENCES users(id),
  referral_id UUID REFERENCES referrals(id),
  amount DECIMAL(10,2) NOT NULL,
  transaction_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create affiliate_withdrawals table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS affiliate_withdrawals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  bank_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create affiliate_balances table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS affiliate_balances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID NOT NULL REFERENCES users(id) UNIQUE,
  available_balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  pending_balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total_earned DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add performance indexes to affiliate tables
CREATE INDEX IF NOT EXISTS referrals_referrer_id_idx ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS referrals_referred_id_idx ON referrals(referred_id);
CREATE INDEX IF NOT EXISTS referrals_referral_code_idx ON referrals(referral_code);
CREATE INDEX IF NOT EXISTS affiliate_transactions_affiliate_id_idx ON affiliate_transactions(affiliate_id);
CREATE INDEX IF NOT EXISTS affiliate_transactions_referral_id_idx ON affiliate_transactions(referral_id);
CREATE INDEX IF NOT EXISTS affiliate_withdrawals_affiliate_id_idx ON affiliate_withdrawals(affiliate_id);
CREATE INDEX IF NOT EXISTS affiliate_balances_affiliate_id_idx ON affiliate_balances(affiliate_id);

-- Set up Row Level Security (RLS) policies
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_balances ENABLE ROW LEVEL SECURITY;

-- Referrals policies
DROP POLICY IF EXISTS "Users can view their own referrals" ON referrals;
CREATE POLICY "Users can view their own referrals"
ON referrals FOR SELECT
USING (auth.uid() = referrer_id);

DROP POLICY IF EXISTS "Users can insert their own referrals" ON referrals;
CREATE POLICY "Users can insert their own referrals"
ON referrals FOR INSERT
WITH CHECK (auth.uid() = referrer_id);

-- Affiliate transactions policies
DROP POLICY IF EXISTS "Users can view their own transactions" ON affiliate_transactions;
CREATE POLICY "Users can view their own transactions"
ON affiliate_transactions FOR SELECT
USING (auth.uid() = affiliate_id);

-- Affiliate withdrawals policies
DROP POLICY IF EXISTS "Users can view their own withdrawals" ON affiliate_withdrawals;
CREATE POLICY "Users can view their own withdrawals"
ON affiliate_withdrawals FOR SELECT
USING (auth.uid() = affiliate_id);

DROP POLICY IF EXISTS "Users can insert their own withdrawals" ON affiliate_withdrawals;
CREATE POLICY "Users can insert their own withdrawals"
ON affiliate_withdrawals FOR INSERT
WITH CHECK (auth.uid() = affiliate_id);

-- Affiliate balances policies
DROP POLICY IF EXISTS "Users can view their own balances" ON affiliate_balances;
CREATE POLICY "Users can view their own balances"
ON affiliate_balances FOR SELECT
USING (auth.uid() = affiliate_id);

-- Enable realtime for affiliate tables
ALTER PUBLICATION supabase_realtime ADD TABLE referrals;
ALTER PUBLICATION supabase_realtime ADD TABLE affiliate_transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE affiliate_withdrawals;
ALTER PUBLICATION supabase_realtime ADD TABLE affiliate_balances;