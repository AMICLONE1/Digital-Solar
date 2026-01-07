-- Supabase Database Schema for PowerNetPro Digital Solar
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Roles Enum
CREATE TYPE user_role AS ENUM ('USER', 'ADMIN', 'OPS', 'FINANCE');

-- KYC Status Enum
CREATE TYPE kyc_status AS ENUM ('PENDING', 'IN_PROGRESS', 'VERIFIED', 'REJECTED');

-- Project Status Enum
CREATE TYPE project_status AS ENUM ('DRAFT', 'ACTIVE', 'FULLY_ALLOCATED', 'ARCHIVED');

-- Capacity Block Status Enum
CREATE TYPE capacity_block_status AS ENUM ('AVAILABLE', 'RESERVED', 'ALLOCATED');

-- Credit Ledger Type Enum
CREATE TYPE credit_ledger_type AS ENUM ('EARNED', 'APPLIED', 'EXPIRED');

-- Credit Ledger Status Enum
CREATE TYPE credit_ledger_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- Bill Status Enum
CREATE TYPE bill_status AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED');

-- Payment Status Enum
CREATE TYPE payment_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- Payment Type Enum
CREATE TYPE payment_type AS ENUM ('RESERVATION', 'BILL_PAYMENT', 'REFUND');

-- Users Table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT UNIQUE,
  name TEXT,
  kyc_status kyc_status DEFAULT 'PENDING',
  aadhaar_number TEXT UNIQUE,
  pan_number TEXT,
  utility_consumer_number TEXT,
  state TEXT,
  discom TEXT,
  role user_role DEFAULT 'USER',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Projects Table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  spv_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  total_kw DECIMAL(10, 2) NOT NULL,
  rate_per_kwh DECIMAL(10, 2) NOT NULL,
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  status project_status DEFAULT 'DRAFT',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Capacity Blocks Table
CREATE TABLE public.capacity_blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  kw DECIMAL(10, 2) NOT NULL,
  status capacity_block_status DEFAULT 'AVAILABLE',
  allocated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allocations Table
CREATE TABLE public.allocations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  capacity_block_id UUID UNIQUE NOT NULL REFERENCES public.capacity_blocks(id) ON DELETE CASCADE,
  payment_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generations Table
CREATE TABLE public.generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL,
  kwh DECIMAL(12, 2) NOT NULL,
  validated BOOLEAN DEFAULT FALSE,
  source TEXT,
  validated_by UUID REFERENCES public.users(id),
  validated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, month, year)
);

-- Credit Ledger Table
CREATE TABLE public.credit_ledgers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  type credit_ledger_type NOT NULL,
  status credit_ledger_status DEFAULT 'PENDING',
  month INTEGER CHECK (month >= 1 AND month <= 12),
  year INTEGER,
  ref_id UUID,
  ref_type TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bills Table
CREATE TABLE public.bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  discom TEXT NOT NULL,
  bill_number TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  credits_applied DECIMAL(10, 2) DEFAULT 0,
  due_date TIMESTAMPTZ NOT NULL,
  status bill_status DEFAULT 'PENDING',
  bbps_bill_id TEXT UNIQUE,
  fetched_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments Table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  type payment_type NOT NULL,
  status payment_status DEFAULT 'PENDING',
  transaction_id TEXT UNIQUE,
  gateway TEXT,
  gateway_order_id TEXT,
  gateway_payment_id TEXT,
  metadata JSONB,
  refunded_at TIMESTAMPTZ,
  refund_amount DECIMAL(10, 2),
  bill_id UUID REFERENCES public.bills(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key for payment_id in allocations
ALTER TABLE public.allocations
ADD CONSTRAINT allocations_payment_id_fkey
FOREIGN KEY (payment_id) REFERENCES public.payments(id);

-- Indexes
CREATE INDEX idx_users_phone ON public.users(phone);
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_kyc_status ON public.users(kyc_status);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_state ON public.projects(state);
CREATE INDEX idx_capacity_blocks_project_id ON public.capacity_blocks(project_id);
CREATE INDEX idx_capacity_blocks_status ON public.capacity_blocks(status);
CREATE INDEX idx_allocations_user_id ON public.allocations(user_id);
CREATE INDEX idx_allocations_capacity_block_id ON public.allocations(capacity_block_id);
CREATE INDEX idx_generations_project_id ON public.generations(project_id);
CREATE INDEX idx_generations_year_month ON public.generations(year, month);
CREATE INDEX idx_credit_ledgers_user_id ON public.credit_ledgers(user_id);
CREATE INDEX idx_credit_ledgers_type ON public.credit_ledgers(type);
CREATE INDEX idx_credit_ledgers_status ON public.credit_ledgers(status);
CREATE INDEX idx_credit_ledgers_year_month ON public.credit_ledgers(year, month);
CREATE INDEX idx_bills_user_id ON public.bills(user_id);
CREATE INDEX idx_bills_status ON public.bills(status);
CREATE INDEX idx_bills_due_date ON public.bills(due_date);
CREATE INDEX idx_bills_bbps_bill_id ON public.bills(bbps_bill_id);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_type ON public.payments(type);
CREATE INDEX idx_payments_transaction_id ON public.payments(transaction_id);
CREATE INDEX idx_payments_gateway_order_id ON public.payments(gateway_order_id);

-- Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.capacity_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_ledgers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Projects are publicly readable
CREATE POLICY "Projects are publicly readable" ON public.projects
  FOR SELECT USING (true);

-- Users can view their own allocations
CREATE POLICY "Users can view own allocations" ON public.allocations
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view their own credit ledgers
CREATE POLICY "Users can view own credit ledgers" ON public.credit_ledgers
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view their own bills
CREATE POLICY "Users can view own bills" ON public.bills
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view their own payments
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_capacity_blocks_updated_at BEFORE UPDATE ON public.capacity_blocks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_allocations_updated_at BEFORE UPDATE ON public.allocations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_generations_updated_at BEFORE UPDATE ON public.generations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_credit_ledgers_updated_at BEFORE UPDATE ON public.credit_ledgers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bills_updated_at BEFORE UPDATE ON public.bills
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

