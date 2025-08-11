-- Create view for visitor statistics
CREATE OR REPLACE VIEW visitor_stats AS
SELECT 
    COUNT(*) as total_visitors,
    COUNT(*) FILTER (WHERE is_active = true) as active_visitors,
    COUNT(*) FILTER (WHERE DATE(entry_time) = CURRENT_DATE) as today_entries,
    COUNT(*) FILTER (WHERE DATE(exit_time) = CURRENT_DATE) as today_exits
FROM visitors;

-- Create view for room occupancy
CREATE OR REPLACE VIEW room_occupancy AS
SELECT 
    r.id,
    r.name,
    r.max_capacity,
    COUNT(v.id) FILTER (WHERE v.is_active = true) as current_visitors,
    r.description,
    r.is_active
FROM rooms r
LEFT JOIN visitors v ON r.name = v.destination_room AND v.is_active = true
WHERE r.is_active = true
GROUP BY r.id, r.name, r.max_capacity, r.description, r.is_active
ORDER BY r.name;

-- Create view for visitor history with room details
CREATE OR REPLACE VIEW visitor_history AS
SELECT 
    v.id,
    v.name,
    v.cpf,
    v.email,
    v.birth_date,
    v.destination_room,
    v.entry_time,
    v.exit_time,
    v.is_active,
    CASE 
        WHEN v.exit_time IS NOT NULL THEN 
            EXTRACT(EPOCH FROM (v.exit_time - v.entry_time))/3600
        ELSE 
            EXTRACT(EPOCH FROM (NOW() - v.entry_time))/3600
    END as duration_hours,
    v.created_at,
    v.updated_at
FROM visitors v
ORDER BY v.entry_time DESC;
