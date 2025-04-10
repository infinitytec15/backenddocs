-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  price_monthly INTEGER NOT NULL,
  price_semiannual INTEGER NOT NULL,
  price_annual INTEGER NOT NULL,
  icon_type VARCHAR NOT NULL,
  color VARCHAR NOT NULL,
  features JSONB NOT NULL,
  popular BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public read access for plans" ON plans
CREATE POLICY "Public read access for plans"
  ON plans FOR SELECT
  USING (active = true);

DROP POLICY IF EXISTS "Admin full access for plans";
CREATE POLICY "Admin full access for plans"
  ON plans FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM user_roles WHERE role = 'admin' OR role = 'superadmin'
  ));

-- Add to realtime publication
alter publication supabase_realtime add table plans;

-- Insert initial data
INSERT INTO plans (name, price_monthly, price_semiannual, price_annual, icon_type, color, features, popular)
VALUES 
  ('Start', 29, 26, 23, 'sparkles', 'blue', '["50 documentos", "5 contratos/mês", "Suporte por email", "Compartilhamento básico"]', false),
  ('Básico', 49, 44, 39, 'rocket', 'indigo', '["100 documentos", "10 contratos/mês", "Suporte por email", "Compartilhamento básico", "Assinatura digital básica"]', true),
  ('Profissional', 99, 89, 79, 'star', 'purple', '["500 documentos", "50 contratos/mês", "Suporte prioritário", "Cofre digital", "Compartilhamento avançado", "Modelos de contratos"]', false),
  ('Empresarial', 249, 224, 199, 'crown', 'amber', '["Documentos ilimitados", "Contratos ilimitados", "Suporte 24/7", "Cofre digital", "API personalizada", "Usuários ilimitados"]', false);