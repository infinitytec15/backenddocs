-- Create payment methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  method_type VARCHAR(50) NOT NULL, -- credit_card, bank_transfer, pix, etc.
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_four VARCHAR(4),
  expiry_date VARCHAR(7),
  card_brand VARCHAR(50),
  holder_name VARCHAR(100),
  billing_address JSONB,
  token_reference VARCHAR(255),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'BRL',
  status VARCHAR(20) NOT NULL, -- pending, completed, failed, refunded
  payment_method_id UUID REFERENCES payment_methods(id),
  payment_type VARCHAR(50) NOT NULL, -- subscription, one_time, invoice
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  reference_id VARCHAR(255),
  description TEXT,
  metadata JSONB
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  invoice_number VARCHAR(50) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, paid, overdue, cancelled
  due_date DATE NOT NULL,
  issue_date DATE NOT NULL,
  payment_id UUID REFERENCES payments(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  items JSONB,
  notes TEXT,
  file_path TEXT
);

-- Create invoice notifications table
CREATE TABLE IF NOT EXISTS invoice_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES invoices(id),
  notification_type VARCHAR(50) NOT NULL, -- email, sms, app
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status VARCHAR(20) NOT NULL, -- sent, delivered, failed
  recipient VARCHAR(255) NOT NULL,
  template_used VARCHAR(100),
  error_message TEXT
);

-- Add realtime publication
alter publication supabase_realtime add table payment_methods;
alter publication supabase_realtime add table payments;
alter publication supabase_realtime add table invoices;
alter publication supabase_realtime add table invoice_notifications;

-- Create RLS policies for payment_methods
DROP POLICY IF EXISTS "Users can view their payment methods" ON payment_methods;
CREATE POLICY "Users can view their payment methods"
  ON payment_methods FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create payment methods" ON payment_methods;
CREATE POLICY "Users can create payment methods"
  ON payment_methods FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their payment methods" ON payment_methods;
CREATE POLICY "Users can update their payment methods"
  ON payment_methods FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their payment methods" ON payment_methods;
CREATE POLICY "Users can delete their payment methods"
  ON payment_methods FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS policies for payments
DROP POLICY IF EXISTS "Users can view their payments" ON payments;
CREATE POLICY "Users can view their payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can insert payments" ON payments;
CREATE POLICY "System can insert payments"
  ON payments FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "System can update payments" ON payments;
CREATE POLICY "System can update payments"
  ON payments FOR UPDATE
  USING (true);

-- Create RLS policies for invoices
DROP POLICY IF EXISTS "Users can view their invoices" ON invoices;
CREATE POLICY "Users can view their invoices"
  ON invoices FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can insert invoices" ON invoices;
CREATE POLICY "System can insert invoices"
  ON invoices FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "System can update invoices" ON invoices;
CREATE POLICY "System can update invoices"
  ON invoices FOR UPDATE
  USING (true);

-- Create RLS policies for invoice_notifications
DROP POLICY IF EXISTS "Users can view their invoice notifications" ON invoice_notifications;
CREATE POLICY "Users can view their invoice notifications"
  ON invoice_notifications FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM invoices WHERE id = invoice_id
    )
  );

DROP POLICY IF EXISTS "System can insert invoice notifications" ON invoice_notifications;
CREATE POLICY "System can insert invoice notifications"
  ON invoice_notifications FOR INSERT
  WITH CHECK (true);