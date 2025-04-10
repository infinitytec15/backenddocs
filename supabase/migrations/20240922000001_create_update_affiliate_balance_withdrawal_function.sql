-- Create function to update affiliate balance for withdrawals
CREATE OR REPLACE FUNCTION update_affiliate_balance_withdrawal(p_affiliate_id UUID, p_amount DECIMAL)
RETURNS VOID AS $$
BEGIN
  -- Update the affiliate's balance
  UPDATE affiliates
  SET 
    balance = balance - p_amount,
    total_paid = total_paid + p_amount,
    updated_at = NOW()
  WHERE id = p_affiliate_id;
END;
$$ LANGUAGE plpgsql;

-- Create storage bucket for invoices if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('invoices', 'invoices', false)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to the invoices bucket
CREATE POLICY "Allow authenticated users to upload invoices"
ON storage.objects FOR INSERT
TO authenticated
USING (bucket_id = 'invoices' AND auth.uid() = owner);

-- Allow users to read their own invoices
CREATE POLICY "Allow users to read their own invoices"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'invoices' AND auth.uid() = owner);
