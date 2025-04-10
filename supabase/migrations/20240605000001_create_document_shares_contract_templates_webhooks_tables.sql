-- Create document_shares table
CREATE TABLE IF NOT EXISTS document_shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  shared_with UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  shared_email TEXT,
  access_level TEXT NOT NULL CHECK (access_level IN ('view', 'edit', 'comment')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for document_shares
CREATE INDEX IF NOT EXISTS document_shares_document_id_idx ON document_shares(document_id);
CREATE INDEX IF NOT EXISTS document_shares_user_id_idx ON document_shares(user_id);
CREATE INDEX IF NOT EXISTS document_shares_shared_with_idx ON document_shares(shared_with);
CREATE INDEX IF NOT EXISTS document_shares_shared_email_idx ON document_shares(shared_email);

-- Enable RLS on document_shares
ALTER TABLE document_shares ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for document_shares
DROP POLICY IF EXISTS "Users can view their own document shares" ON document_shares;
CREATE POLICY "Users can view their own document shares"
  ON document_shares FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = shared_with);

DROP POLICY IF EXISTS "Users can insert their own document shares" ON document_shares;
CREATE POLICY "Users can insert their own document shares"
  ON document_shares FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own document shares" ON document_shares;
CREATE POLICY "Users can update their own document shares"
  ON document_shares FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own document shares" ON document_shares;
CREATE POLICY "Users can delete their own document shares"
  ON document_shares FOR DELETE
  USING (auth.uid() = user_id);

-- Create contract_templates table
CREATE TABLE IF NOT EXISTS contract_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT false,
  category TEXT,
  tags TEXT[],
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for contract_templates
CREATE INDEX IF NOT EXISTS contract_templates_user_id_idx ON contract_templates(user_id);
CREATE INDEX IF NOT EXISTS contract_templates_is_public_idx ON contract_templates(is_public);
CREATE INDEX IF NOT EXISTS contract_templates_category_idx ON contract_templates(category);

-- Enable RLS on contract_templates
ALTER TABLE contract_templates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contract_templates
DROP POLICY IF EXISTS "Users can view their own contract templates" ON contract_templates;
CREATE POLICY "Users can view their own contract templates"
  ON contract_templates FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

DROP POLICY IF EXISTS "Users can insert their own contract templates" ON contract_templates;
CREATE POLICY "Users can insert their own contract templates"
  ON contract_templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own contract templates" ON contract_templates;
CREATE POLICY "Users can update their own contract templates"
  ON contract_templates FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own contract templates" ON contract_templates;
CREATE POLICY "Users can delete their own contract templates"
  ON contract_templates FOR DELETE
  USING (auth.uid() = user_id);

-- Create webhooks table
CREATE TABLE IF NOT EXISTS webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  events TEXT[] NOT NULL,
  secret TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_triggered_at TIMESTAMPTZ,
  failure_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for webhooks
CREATE INDEX IF NOT EXISTS webhooks_user_id_idx ON webhooks(user_id);
CREATE INDEX IF NOT EXISTS webhooks_is_active_idx ON webhooks(is_active);

-- Enable RLS on webhooks
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for webhooks
DROP POLICY IF EXISTS "Users can view their own webhooks" ON webhooks;
CREATE POLICY "Users can view their own webhooks"
  ON webhooks FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own webhooks" ON webhooks;
CREATE POLICY "Users can insert their own webhooks"
  ON webhooks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own webhooks" ON webhooks;
CREATE POLICY "Users can update their own webhooks"
  ON webhooks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own webhooks" ON webhooks;
CREATE POLICY "Users can delete their own webhooks"
  ON webhooks FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime for all tables
alter publication supabase_realtime add table document_shares;
alter publication supabase_realtime add table contract_templates;
alter publication supabase_realtime add table webhooks;