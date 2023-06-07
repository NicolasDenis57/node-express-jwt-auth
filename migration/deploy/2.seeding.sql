-- Deploy smoothies:2.seeding to pg

-- mot de passe : !P@ssw0rd!

BEGIN;

INSERT INTO app_user ("firstname", "lastname","email", "password", "role") VALUES
    ('Nicolas', 'Denis', 'admin@admin.fr' , '$2a$12$f3Uq98sdNM6BEFK8ZXrFxuA5LIxicNdK2O70TGZJBpb.YmJGvgnPS', 5150),
    ('Marius', 'Denis', 'member@member.fr' , '$2a$12$f3Uq98sdNM6BEFK8ZXrFxuA5LIxicNdK2O70TGZJBpb.YmJGvgnPS', 2001);

INSERT INTO recipe ("name", "ingredients", "img", "user_id") VALUES
    ('Banana Boost', 'Banana, Vanilla ice cream, Milk', pg_read_binary_file('/var/www/html/ohm/Projet JWT/node-express-jwt-auth/migration/deploy/smoothie.png'), 1),
    ('Tropical Twist', 'Banana, Vanilla ice cream, Milk', pg_read_binary_file('/var/www/html/ohm/Projet JWT/node-express-jwt-auth/migration/deploy/smoothie.png'), 2),
    ('Protein Packer', 'Banana, Vanilla ice cream, Milk', pg_read_binary_file('/var/www/html/ohm/Projet JWT/node-express-jwt-auth/migration/deploy/smoothie.png'), 2),
    ('Banana Boost', 'Banana, Vanilla ice cream, Milk', pg_read_binary_file('/var/www/html/ohm/Projet JWT/node-express-jwt-auth/migration/deploy/smoothie.png'), 1),
    ('Tropical Twist', 'Banana, Vanilla ice cream, Milk', pg_read_binary_file('/var/www/html/ohm/Projet JWT/node-express-jwt-auth/migration/deploy/smoothie.png'), 2),
    ('Protein Packer', 'Banana, Vanilla ice cream, Milk', pg_read_binary_file('/var/www/html/ohm/Projet JWT/node-express-jwt-auth/migration/deploy/smoothie.png'), 2);
    
COMMIT;


