-- Insert default rooms
INSERT INTO rooms (name, max_capacity, description) VALUES
    ('Laboratório Principal', 3, 'Laboratório de pesquisa e desenvolvimento'),
    ('Sala de Reuniões A', 3, 'Sala de reuniões executivas'),
    ('Sala de Reuniões B', 3, 'Sala de reuniões técnicas'),
    ('Workshop', 2, 'Oficina de prototipagem'),
    ('Sala de Servidores', 1, 'Centro de dados da Stark Industries'),
    ('Escritório do Tony Stark', 1, 'Escritório executivo'),
    ('Hangar', 5, 'Área de testes de equipamentos')
ON CONFLICT (name) DO NOTHING;

-- Insert default admin user
INSERT INTO users (email, name, role) VALUES
    ('admin@starkindustries.com', 'J.A.R.V.I.S. Admin', 'admin'),
    ('security@starkindustries.com', 'Segurança Stark', 'security')
ON CONFLICT (email) DO NOTHING;
