CREATE DATABASE fyp;

CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR(225),
    password VARCHAR(225),
    role VARCHAR(225),
    userName VARCHAR(225),
    phoneNumber VARCHAR(225),
    date DATE,
    active BOOLEAN
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(225),
    description TEXT,
    category VARCHAR(225),
    price VARCHAR(225),
    like INT,
);

CREATE TABLE product (
    price text,
    name text,
    id serial NOT NULL,
    description text,
    category text,
    likes integer,
    PRIMARY KEY (id)
);
