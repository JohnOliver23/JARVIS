-- Enable Row Level Security
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for rooms (public read, authenticated write)
CREATE POLICY "Allow public read access on rooms" ON rooms
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on rooms" ON rooms
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on rooms" ON rooms
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policies for visitors (public read, authenticated write)
CREATE POLICY "Allow public read access on visitors" ON visitors
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on visitors" ON visitors
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on visitors" ON visitors
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policies for system_logs (authenticated only)
CREATE POLICY "Allow authenticated read access on system_logs" ON system_logs
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on system_logs" ON system_logs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policies for users (authenticated only)
CREATE POLICY "Allow authenticated read access on users" ON users
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);
