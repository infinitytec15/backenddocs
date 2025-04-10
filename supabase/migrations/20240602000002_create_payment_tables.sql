-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  interval TEXT NOT NULL,
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on plans
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for plans
CREATE POLICY "Anyone can view active plans"
  ON plans FOR SELECT
  USING (is_active = true);

CREATE POLICY "Only admins can insert plans"
  ON plans FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM user_settings WHERE role IN ('admin', 'superadmin')));

CREATE POLICY "Only admins can update plans"
  ON plans FOR UPDATE
  USING (auth.uid() IN (SELECT user_id FROM user_settings WHERE role IN ('admin', 'superadmin')));

CREATE POLICY "Only admins can delete plans"
  ON plans FOR DELETE
  USING (auth.uid() IN (SELECT user_id FROM user_settings WHERE role IN ('admin', 'superadmin')));

-- Create user_plans table
CREATE TABLE IF NOT EXISTS user_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES plans(id),
  status TEXT NOT NULL DEFAULT 'active',
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for performance
CREATE INDEX IF NOT EXISTS idx_user_plans_user_id ON user_plans(user_id);

-- Enable RLS on user_plans
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_plans
CREATE POLICY "Users can view their own plans"
  ON user_plans FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Only admins can insert user plans"
  ON user_plans FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM user_settings WHERE role IN ('admin', 'superadmin')));

CREATE POLICY "Only admins can update user plans"
  ON user_plans FOR UPDATE
  USING (auth.uid() IN (SELECT user_id FROM user_settings WHERE role IN ('admin', 'superadmin')));

CREATE POLICY "Only admins can delete user plans"
  ON user_plans FOR DELETE
  USING (auth.uid() IN (SELECT user_id FROM user_settings WHERE role IN ('admin', 'superadmin')));

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  user_plan_id UUID REFERENCES user_plans(id),
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_method TEXT,
  payment_status TEXT NOT NULL,
  payment_intent_id TEXT,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);

-- Enable RLS on payments
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for payments
CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Only system can insert payments"
  ON payments FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM user_settings WHERE role IN ('admin', 'superadmin')));

-- Enable realtime for the new tables
alter publication supabase_realtime add table plans;
alter publication supabase_realtime add table user_plans;
alter publication supabase_realtime add table payments;