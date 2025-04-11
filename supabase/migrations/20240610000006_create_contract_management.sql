-- Create contract templates table
CREATE TABLE IF NOT EXISTS contract_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  version INTEGER NOT NULL DEFAULT 1,
  category VARCHAR(50),
  tags TEXT[]
);

-- Create contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  template_id UUID REFERENCES contract_templates(id),
  file_path TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, pending_signature, signed, expired, cancelled
  expires_at TIMESTAMPTZ,
  signed_at TIMESTAMPTZ,
  counterparty_name VARCHAR(200),
  counterparty_email VARCHAR(200),
  counterparty_document VARCHAR(50),
  metadata JSONB
);

-- Create contract signatures table
CREATE TABLE IF NOT EXISTS contract_signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID NOT NULL REFERENCES contracts(id),
  signer_id UUID REFERENCES auth.users(id),
  signer_email VARCHAR(200) NOT NULL,
  signer_name VARCHAR(200) NOT NULL,
  signer_role VARCHAR(100),
  signature_status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, signed, rejected, expired
  signed_at TIMESTAMPTZ,
  signature_method VARCHAR(50),
  ip_address VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  signature_token UUID NOT NULL DEFAULT uuid_generate_v4(),
  expires_at TIMESTAMPTZ,
  signature_data TEXT
);

-- Create contract events table for audit trail
CREATE TABLE IF NOT EXISTS contract_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID NOT NULL REFERENCES contracts(id),
  event_type VARCHAR(50) NOT NULL, -- created, viewed, signed, rejected, expired, etc.
  user_id UUID REFERENCES auth.users(id),
  event_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(50),
  user_agent TEXT
);

-- Add realtime publication
alter publication supabase_realtime add table contract_templates;
alter publication supabase_realtime add table contracts;
alter publication supabase_realtime add table contract_signatures;
alter publication supabase_realtime add table contract_events;

-- Create RLS policies for contract_templates
DROP POLICY IF EXISTS "Users can view contract templates" ON contract_templates;
CREATE POLICY "Users can view contract templates"
  ON contract_templates FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Users can create contract templates" ON contract_templates;
CREATE POLICY "Users can create contract templates"
  ON contract_templates FOR INSERT
  WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can update their contract templates" ON contract_templates;
CREATE POLICY "Users can update their contract templates"
  ON contract_templates FOR UPDATE
  USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can delete their contract templates" ON contract_templates;
CREATE POLICY "Users can delete their contract templates"
  ON contract_templates FOR DELETE
  USING (auth.uid() = created_by);

-- Create RLS policies for contracts
DROP POLICY IF EXISTS "Users can view their contracts" ON contracts;
CREATE POLICY "Users can view their contracts"
  ON contracts FOR SELECT
  USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can create contracts" ON contracts;
CREATE POLICY "Users can create contracts"
  ON contracts FOR INSERT
  WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can update their contracts" ON contracts;
CREATE POLICY "Users can update their contracts"
  ON contracts FOR UPDATE
  USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can delete their contracts" ON contracts;
CREATE POLICY "Users can delete their contracts"
  ON contracts FOR DELETE
  USING (auth.uid() = created_by AND status = 'draft');

-- Create RLS policies for contract_signatures
DROP POLICY IF EXISTS "Users can view signatures for their contracts" ON contract_signatures;
CREATE POLICY "Users can view signatures for their contracts"
  ON contract_signatures FOR SELECT
  USING (
    auth.uid() IN (
      SELECT created_by FROM contracts WHERE id = contract_id
    ) OR 
    auth.uid() = signer_id
  );

DROP POLICY IF EXISTS "Users can create signatures for their contracts" ON contract_signatures;
CREATE POLICY "Users can create signatures for their contracts"
  ON contract_signatures FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT created_by FROM contracts WHERE id = contract_id
    )
  );

DROP POLICY IF EXISTS "Users can update signatures" ON contract_signatures;
CREATE POLICY "Users can update signatures"
  ON contract_signatures FOR UPDATE
  USING (
    (auth.uid() IN (
      SELECT created_by FROM contracts WHERE id = contract_id
    ) AND signature_status = 'pending') OR
    (auth.uid() = signer_id)
  );

-- Create RLS policies for contract_events
DROP POLICY IF EXISTS "Users can view events for their contracts" ON contract_events;
CREATE POLICY "Users can view events for their contracts"
  ON contract_events FOR SELECT
  USING (
    auth.uid() IN (
      SELECT created_by FROM contracts WHERE id = contract_id
    )
  );

DROP POLICY IF EXISTS "System can insert contract events" ON contract_events;
CREATE POLICY "System can insert contract events"
  ON contract_events FOR INSERT
  WITH CHECK (true);