-- Create a function to update affiliate balance when a withdrawal is requested
CREATE OR REPLACE FUNCTION update_affiliate_balance_withdrawal(p_affiliate_id UUID, p_amount DECIMAL)
RETURNS VOID AS $$
BEGIN
  -- Check if affiliate has enough balance
  IF (SELECT balance FROM affiliates WHERE id = p_affiliate_id) < p_amount THEN
    RAISE EXCEPTION 'Insufficient balance for withdrawal';
  END IF;

  -- Update affiliate balance
  UPDATE affiliates
  SET balance = balance - p_amount
  WHERE id = p_affiliate_id;

END;
$$ LANGUAGE plpgsql;

-- Enable RLS on the affiliates table
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;

-- Create policy for affiliates table
DROP POLICY IF EXISTS "Users can view and update their own affiliate data" ON affiliates;
CREATE POLICY "Users can view and update their own affiliate data"
ON affiliates
FOR ALL
USING (auth.uid() = user_id);
