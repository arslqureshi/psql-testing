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
    price VARCHAR(20),
    name VARCHAR(255),
    id serial NOT NULL,
    description text,
    category VARCHAR(20),
    likes integer,
    image VARCHAR(255),
	sellerId integer,
    PRIMARY KEY (id),
	CONSTRAINT sellerId
    	FOREIGN KEY(sellerId) 
			REFERENCES person(person_id)
);