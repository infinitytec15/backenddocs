-- Create referral_codes table
CREATE TABLE IF NOT EXISTS referral_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  code VARCHAR(20) NOT NULL UNIQUE,
  discount_amount DECIMAL(10, 2) NOT NULL,
  discount_type VARCHAR(10) NOT NULL,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on referral_codes
CREATE INDEX IF NOT EXISTS idx_referral_codes_user_id ON referral_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON referral_codes(code);

-- Enable RLS on referral_codes
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for referral_codes
DROP POLICY IF EXISTS "Users can view their own referral codes" ON referral_codes;
CREATE POLICY "Users can view their own referral codes"
ON referral_codes FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own referral codes" ON referral_codes;
CREATE POLICY "Users can insert their own referral codes"
ON referral_codes FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own referral codes" ON referral_codes;
CREATE POLICY "Users can update their own referral codes"
ON referral_codes FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own referral codes" ON referral_codes;
CREATE POLICY "Users can delete their own referral codes"
ON referral_codes FOR DELETE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins have full access to referral codes" ON referral_codes;
CREATE POLICY "Admins have full access to referral codes"
ON referral_codes
USING (
  EXISTS (
    SELECT 1 FROM user_settings
    WHERE user_settings.user_id = auth.uid()
    AND (user_settings.role = 'admin' OR user_settings.role = 'superadmin')
  )
);

-- Create audit_trail table
CREATE TABLE IF NOT EXISTS audit_trail (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name VARCHAR(50) NOT NULL,
  record_id UUID NOT NULL,
  operation VARCHAR(10) NOT NULL,
  old_data JSONB,
  new_data JSONB,
  changed_by UUID,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Create index on audit_trail
CREATE INDEX IF NOT EXISTS idx_audit_trail_table_name ON audit_trail(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_trail_record_id ON audit_trail(record_id);
CREATE INDEX IF NOT EXISTS idx_audit_trail_changed_by ON audit_trail(changed_by);
CREATE INDEX IF NOT EXISTS idx_audit_trail_changed_at ON audit_trail(changed_at);

-- Enable RLS on audit_trail
ALTER TABLE audit_trail ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for audit_trail
DROP POLICY IF EXISTS "Only admins can view audit trail" ON audit_trail;
CREATE POLICY "Only admins can view audit trail"
ON audit_trail FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_settings
    WHERE user_settings.user_id = auth.uid()
    AND (user_settings.role = 'admin' OR user_settings.role = 'superadmin')
  )
);

-- Create vault table for sensitive data
CREATE TABLE IF NOT EXISTS vault (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  data_type VARCHAR(50) NOT NULL,
  encrypted_data TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on vault
CREATE INDEX IF NOT EXISTS idx_vault_user_id ON vault(user_id);
CREATE INDEX IF NOT EXISTS idx_vault_data_type ON vault(data_type);

-- Enable RLS on vault
ALTER TABLE vault ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for vault
DROP POLICY IF EXISTS "Users can view their own vault data" ON vault;
CREATE POLICY "Users can view their own vault data"
ON vault FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own vault data" ON vault;
CREATE POLICY "Users can insert their own vault data"
ON vault FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own vault data" ON vault;
CREATE POLICY "Users can update their own vault data"
ON vault FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own vault data" ON vault;
CREATE POLICY "Users can delete their own vault data"
ON vault FOR DELETE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Superadmins have full access to vault" ON vault;
CREATE POLICY "Superadmins have full access to vault"
ON vault
USING (
  EXISTS (
    SELECT 1 FROM user_settings
    WHERE user_settings.user_id = auth.uid()
    AND user_settings.role = 'superadmin'
  )
);

-- Enable realtime for all tables
alter publication supabase_realtime add table referral_codes;
alter publication supabase_realtime add table audit_trail;
alter publication supabase_realtime add table vault;