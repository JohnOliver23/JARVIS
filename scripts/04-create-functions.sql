-- Function to get visitor statistics
CREATE OR REPLACE FUNCTION get_visitor_statistics()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'totalVisitors', (SELECT total_visitors FROM visitor_stats),
        'activeVisitors', (SELECT active_visitors FROM visitor_stats),
        'todayEntries', (SELECT today_entries FROM visitor_stats),
        'todayExits', (SELECT today_exits FROM visitor_stats),
        'roomsOccupancy', (
            SELECT json_agg(
                json_build_object(
                    'id', id,
                    'name', name,
                    'maxCapacity', max_capacity,
                    'currentVisitors', current_visitors
                )
            )
            FROM room_occupancy
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to register visitor exit
CREATE OR REPLACE FUNCTION register_visitor_exit(visitor_id UUID)
RETURNS JSON AS $$
DECLARE
    visitor_record visitors%ROWTYPE;
    result JSON;
BEGIN
    -- Update visitor exit time
    UPDATE visitors 
    SET exit_time = NOW(), 
        is_active = false,
        updated_at = NOW()
    WHERE id = visitor_id AND is_active = true
    RETURNING * INTO visitor_record;
    
    IF visitor_record.id IS NULL THEN
        RETURN json_build_object('success', false, 'message', 'Visitante não encontrado ou já registrou saída');
    END IF;
    
    -- Log the action
    INSERT INTO system_logs (action, entity_type, entity_id, details)
    VALUES ('EXIT_REGISTERED', 'visitor', visitor_id, 
            json_build_object('visitor_name', visitor_record.name, 'room', visitor_record.destination_room));
    
    RETURN json_build_object(
        'success', true, 
        'message', 'Saída registrada com sucesso',
        'visitor', row_to_json(visitor_record)
    );
END;
$$ LANGUAGE plpgsql;

-- Function to check room capacity before adding visitor
CREATE OR REPLACE FUNCTION check_room_capacity(room_name VARCHAR)
RETURNS JSON AS $$
DECLARE
    room_info RECORD;
    current_count INTEGER;
BEGIN
    -- Get room information
    SELECT * INTO room_info FROM rooms WHERE name = room_name AND is_active = true;
    
    IF room_info.id IS NULL THEN
        RETURN json_build_object('available', false, 'message', 'Sala não encontrada');
    END IF;
    
    -- Count current active visitors in the room
    SELECT COUNT(*) INTO current_count 
    FROM visitors 
    WHERE destination_room = room_name AND is_active = true;
    
    IF current_count >= room_info.max_capacity THEN
        RETURN json_build_object(
            'available', false, 
            'message', 'Sala lotada',
            'currentVisitors', current_count,
            'maxCapacity', room_info.max_capacity
        );
    END IF;
    
    RETURN json_build_object(
        'available', true,
        'message', 'Sala disponível',
        'currentVisitors', current_count,
        'maxCapacity', room_info.max_capacity
    );
END;
$$ LANGUAGE plpgsql;
