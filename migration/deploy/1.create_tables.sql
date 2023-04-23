-- Deploy smoothies:1.create_tables to pg

BEGIN;

CREATE TABLE  app_user ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text not null,
    lastname text not null,
    email text unique not null,
    password text not null,
    role varchar(10) default 'member' 
);

CREATE UNIQUE INDEX email_idx ON app_user (email);

COMMIT;