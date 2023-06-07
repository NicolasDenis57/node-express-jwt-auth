-- Deploy smoothies:1.create_tables to pg

BEGIN;


CREATE TABLE  app_user ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text not null,
    lastname text not null,
    email text unique not null,
    password text not null,
    role INT DEFAULT 2001,
    refreshToken text
);

CREATE UNIQUE INDEX email_idx ON app_user (email);


CREATE TABLE recipe (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text not null,
    ingredients text not null,
    img BYTEA,
    user_id INT REFERENCES app_user(id)
);

COMMIT;