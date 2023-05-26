-- Deploy smoothies:2.seeding to pg

-- mot de passe : !P@ssw0rd!

BEGIN;

INSERT INTO app_user ("firstname", "lastname","email", "password", "role") VALUES
    ('Nicolas', 'Denis', 'admin@admin.fr' , '$2a$12$f3Uq98sdNM6BEFK8ZXrFxuA5LIxicNdK2O70TGZJBpb.YmJGvgnPS', 'admin'),
    ('Marius', 'Denis', 'member@member.fr' , '$2a$12$f3Uq98sdNM6BEFK8ZXrFxuA5LIxicNdK2O70TGZJBpb.YmJGvgnPS', 'member');
COMMIT;