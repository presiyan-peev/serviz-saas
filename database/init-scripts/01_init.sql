-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set up any PostgreSQL-specific configurations
ALTER SYSTEM SET max_connections = '200';

-- You can add more PostgreSQL-specific setup here