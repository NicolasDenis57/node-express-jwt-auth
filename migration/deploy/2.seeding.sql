-- Deploy smoothies:2.seeding to pg

BEGIN;

INSERT INTO app_user ("firstname", "lastname","email", "password") VALUES
    ('Nicolas', 'foaster', 'nico@smoothies.com' , '$2a$12$Z04IC5blfArNDGBHQ/rV7u8pr8VX3xYT673bC3wNgfe2xOfM6HEKC'),
    ('Léo', 'marron', 'leoma@smoothies.com' , '$2a$12$Z04IC5blfArNDGBHQ/rV7u8pr8VX3xYT673bC3wNgfe2xOfM6HEKC'),
    ('Sandra', 'delaire', 'sandra@smoothies.com' , '$2a$12$Z04IC5blfArNDGBHQ/rV7u8pr8VX3xYT673bC3wNgfe2xOfM6HEKC');

COMMIT;