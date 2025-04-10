-- Create support_tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  priority TEXT NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closed_at TIMESTAMP WITH TIME ZONE,
  assigned_to UUID,
  tags TEXT[]
);

-- Create index on support_tickets
CREATE INDEX IF NOT EXISTS support_tickets_user_id_idx ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS support_tickets_status_idx ON support_tickets(status);
CREATE INDEX IF NOT EXISTS support_tickets_priority_idx ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS support_tickets_assigned_to_idx ON support_tickets(assigned_to);

-- Enable RLS on support_tickets
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Create policies for support_tickets
DROP POLICY IF EXISTS "Users can view their own tickets" ON support_tickets;
CREATE POLICY "Users can view their own tickets"
ON support_tickets FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own tickets" ON support_tickets;
CREATE POLICY "Users can insert their own tickets"
ON support_tickets FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own tickets" ON support_tickets;
CREATE POLICY "Users can update their own tickets"
ON support_tickets FOR UPDATE
USING (auth.uid() = user_id);

-- Create user_rewards table
CREATE TABLE IF NOT EXISTS user_rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  reward_type TEXT NOT NULL,
  reward_amount INTEGER NOT NULL,
  description TEXT,
  is_redeemed BOOLEAN DEFAULT FALSE,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_rewards
CREATE INDEX IF NOT EXISTS user_rewards_user_id_idx ON user_rewards(user_id);
CREATE INDEX IF NOT EXISTS user_rewards_reward_type_idx ON user_rewards(reward_type);
CREATE INDEX IF NOT EXISTS user_rewards_is_redeemed_idx ON user_rewards(is_redeemed);

-- Enable RLS on user_rewards
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;

-- Create policies for user_rewards
DROP POLICY IF EXISTS "Users can view their own rewards" ON user_rewards;
CREATE POLICY "Users can view their own rewards"
ON user_rewards FOR SELECT
USING (auth.uid() = user_id);

-- Create user_ips table
CREATE TABLE IF NOT EXISTS user_ips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  ip_address TEXT NOT NULL,
  user_agent TEXT,
  location TEXT,
  last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  first_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_blocked BOOLEAN DEFAULT FALSE
);

-- Create index on user_ips
CREATE INDEX IF NOT EXISTS user_ips_user_id_idx ON user_ips(user_id);
CREATE INDEX IF NOT EXISTS user_ips_ip_address_idx ON user_ips(ip_address);
CREATE INDEX IF NOT EXISTS user_ips_is_blocked_idx ON user_ips(is_blocked);

-- Enable RLS on user_ips
ALTER TABLE user_ips ENABLE ROW LEVEL SECURITY;

-- Create policies for user_ips
DROP POLICY IF EXISTS "Users can view their own IPs" ON user_ips;
CREATE POLICY "Users can view their own IPs"
ON user_ips FOR SELECT
USING (auth.uid() = user_id);

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE support_tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE user_rewards;
ALTER PUBLICATION supabase_realtime ADD TABLE user_ips;
