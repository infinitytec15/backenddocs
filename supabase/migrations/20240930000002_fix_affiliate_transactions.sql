-- Fix affiliate_transactions table
DO $$
DECLARE
    table_exists BOOLEAN;
    function_exists_withdrawal BOOLEAN;
    function_exists_balance BOOLEAN;
BEGIN
    -- Check if the affiliate_transactions table exists
    SELECT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'affiliate_transactions'
    ) INTO table_exists;
    
    IF NOT table_exists THEN
        -- Create the affiliate_transactions table
        CREATE TABLE public.affiliate_transactions (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            affiliate_id UUID REFERENCES public.affiliates(id) ON DELETE CASCADE,
            referred_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            amount DECIMAL(10, 2) NOT NULL,
            type VARCHAR(50) NOT NULL CHECK (type IN ('commission', 'withdrawal', 'adjustment')),
            status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'completed', 'rejected')),
            description TEXT,
            metadata JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );

        -- Add to realtime publication
        ALTER PUBLICATION supabase_realtime ADD TABLE public.affiliate_transactions;

        -- Add RLS policies
        ALTER TABLE public.affiliate_transactions ENABLE ROW LEVEL SECURITY;

        -- Policy for users to view their own transactions
        CREATE POLICY "Users can view their own transactions"
            ON public.affiliate_transactions
            FOR SELECT
            USING (auth.uid() = user_id);

        -- Policy for admins to manage all transactions
        CREATE POLICY "Admins can manage all transactions"
            ON public.affiliate_transactions
            USING (
                EXISTS (
                    SELECT 1 FROM public.user_settings
                    WHERE user_id = auth.uid()
                    AND (role = 'admin' OR role = 'superadmin')
                )
            );
    END IF;

    -- Check if the update_affiliate_balance_withdrawal function exists
    SELECT EXISTS (
        SELECT FROM pg_proc WHERE proname = 'update_affiliate_balance_withdrawal'
    ) INTO function_exists_withdrawal;
    
    IF NOT function_exists_withdrawal THEN
        -- Create the function
        CREATE OR REPLACE FUNCTION public.update_affiliate_balance_withdrawal(
            p_user_id UUID,
            p_amount DECIMAL,
            p_invoice_file_id TEXT
        )
        RETURNS BOOLEAN
        LANGUAGE plpgsql
        SECURITY DEFINER
        AS $func$
        DECLARE
            v_affiliate_id UUID;
            v_current_balance DECIMAL;
        BEGIN
            -- Get the affiliate ID and current balance
            SELECT id, balance INTO v_affiliate_id, v_current_balance
            FROM public.affiliates
            WHERE user_id = p_user_id;
            
            -- Check if affiliate exists
            IF v_affiliate_id IS NULL THEN
                RETURN FALSE;
            END IF;
            
            -- Check if balance is sufficient
            IF v_current_balance < p_amount THEN
                RETURN FALSE;
            END IF;
            
            -- Create withdrawal transaction
            INSERT INTO public.affiliate_transactions (
                user_id,
                affiliate_id,
                amount,
                type,
                status,
                description,
                metadata
            ) VALUES (
                p_user_id,
                v_affiliate_id,
                p_amount,
                'withdrawal',
                'pending',
                'Solicitação de saque',
                jsonb_build_object('invoice_file_id', p_invoice_file_id)
            );
            
            -- Update the affiliate's balance
            UPDATE public.affiliates
            SET 
                balance = balance - p_amount,
                total_paid = total_paid + p_amount,
                updated_at = NOW()
            WHERE id = v_affiliate_id;
            
            RETURN TRUE;
        END;
        $func$;
    END IF;

    -- Check if the update_affiliate_balance function exists
    SELECT EXISTS (
        SELECT FROM pg_proc WHERE proname = 'update_affiliate_balance'
    ) INTO function_exists_balance;
    
    IF NOT function_exists_balance THEN
        -- Create the function
        CREATE OR REPLACE FUNCTION public.update_affiliate_balance(
            p_affiliate_id UUID,
            p_amount DECIMAL
        )
        RETURNS VOID
        LANGUAGE plpgsql
        SECURITY DEFINER
        AS $func$
        BEGIN
            -- Update the affiliate's balance
            UPDATE public.affiliates
            SET 
                balance = balance + p_amount,
                total_earned = total_earned + p_amount,
                updated_at = NOW()
            WHERE id = p_affiliate_id;
        END;
        $func$;
    END IF;
END
$$;