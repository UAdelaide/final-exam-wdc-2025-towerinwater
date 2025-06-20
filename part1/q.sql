/*INSERT INTO Users (username, email, password_hash, role) VALUES
    ('alice123',  'alice@example.com',  'hashed123', 'owner'),
    ('bobwalker', 'bob@example.com',    'hashed456', 'walker'),
    ('carol123',  'carol@example.com',  'hashed789', 'owner'),
    ('hai', 'hai@example.com',   'hashed888', 'owner'),
    ('phuong', 'phuong@example.com',    'hashed126', 'owner');
*/

INSERT INTO Dogs (name, size, owner_id) VALUES
    ('Max', 'medium', (SELECT user_id FROM Users WHERE username = 'alice123')),

SELECT * FROM Users;