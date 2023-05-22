-- Deploy smoothies:2.seeding to pg

-- mot de passe : !P@ssw0rd!

BEGIN;

INSERT INTO app_user ("firstname", "lastname","email", "password") VALUES
    ('Nicolas', 'foaster', 'nico@smoothies.com' , '$2a$12$f3Uq98sdNM6BEFK8ZXrFxuA5LIxicNdK2O70TGZJBpb.YmJGvgnPS'),
    ('Léo', 'marron', 'leoma@smoothies.com' , '$2a$12$f3Uq98sdNM6BEFK8ZXrFxuA5LIxicNdK2O70TGZJBpb.YmJGvgnPS'),
    ('Sandra', 'delaire', 'sandra@smoothies.com' , '$2a$12$f3Uq98sdNM6BEFK8ZXrFxuA5LIxicNdK2O70TGZJBpb.YmJGvgnPS');

COMMIT;