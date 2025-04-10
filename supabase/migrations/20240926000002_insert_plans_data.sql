-- Clear existing plans to avoid duplicates
TRUNCATE TABLE plans CASCADE;

-- Insert Basic Plan
INSERT INTO plans (name, description, price, interval, features, is_active)
VALUES (
  'Básico',
  'Ideal para profissionais autônomos e pequenas empresas',
  29.90,
  'month',
  '{
    "storage": "5GB",
    "documents": 100,
    "contracts": 20,
    "templates": 5,
    "users": 1,
    "sharing": true,
    "signatures": true,
    "notifications": true,
    "audit_trail": false,
    "advanced_security": false,
    "api_access": false,
    "priority_support": false
  }',
  TRUE
);

-- Insert Professional Plan
INSERT INTO plans (name, description, price, interval, features, is_active)
VALUES (
  'Profissional',
  'Perfeito para escritórios e empresas em crescimento',
  79.90,
  'month',
  '{
    "storage": "25GB",
    "documents": 500,
    "contracts": 100,
    "templates": 20,
    "users": 5,
    "sharing": true,
    "signatures": true,
    "notifications": true,
    "audit_trail": true,
    "advanced_security": true,
    "api_access": false,
    "priority_support": false
  }',
  TRUE
);

-- Insert Enterprise Plan
INSERT INTO plans (name, description, price, interval, features, is_active)
VALUES (
  'Empresarial',
  'Solução completa para médias e grandes empresas',
  199.90,
  'month',
  '{
    "storage": "100GB",
    "documents": "Ilimitado",
    "contracts": "Ilimitado",
    "templates": "Ilimitado",
    "users": 20,
    "sharing": true,
    "signatures": true,
    "notifications": true,
    "audit_trail": true,
    "advanced_security": true,
    "api_access": true,
    "priority_support": true
  }',
  TRUE
);

-- Insert Annual Basic Plan (with discount)
INSERT INTO plans (name, description, price, interval, features, is_active)
VALUES (
  'Básico Anual',
  'Ideal para profissionais autônomos e pequenas empresas - Pagamento anual com desconto',
  299.00,
  'year',
  '{
    "storage": "5GB",
    "documents": 100,
    "contracts": 20,
    "templates": 5,
    "users": 1,
    "sharing": true,
    "signatures": true,
    "notifications": true,
    "audit_trail": false,
    "advanced_security": false,
    "api_access": false,
    "priority_support": false
  }',
  TRUE
);

-- Insert Annual Professional Plan (with discount)
INSERT INTO plans (name, description, price, interval, features, is_active)
VALUES (
  'Profissional Anual',
  'Perfeito para escritórios e empresas em crescimento - Pagamento anual com desconto',
  799.00,
  'year',
  '{
    "storage": "25GB",
    "documents": 500,
    "contracts": 100,
    "templates": 20,
    "users": 5,
    "sharing": true,
    "signatures": true,
    "notifications": true,
    "audit_trail": true,
    "advanced_security": true,
    "api_access": false,
    "priority_support": false
  }',
  TRUE
);

-- Insert Annual Enterprise Plan (with discount)
INSERT INTO plans (name, description, price, interval, features, is_active)
VALUES (
  'Empresarial Anual',
  'Solução completa para médias e grandes empresas - Pagamento anual com desconto',
  1999.00,
  'year',
  '{
    "storage": "100GB",
    "documents": "Ilimitado",
    "contracts": "Ilimitado",
    "templates": "Ilimitado",
    "users": 20,
    "sharing": true,
    "signatures": true,
    "notifications": true,
    "audit_trail": true,
    "advanced_security": true,
    "api_access": true,
    "priority_support": true
  }',
  TRUE
);