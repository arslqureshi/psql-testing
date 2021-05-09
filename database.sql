CREATE DATABASE fyp;

CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR(225),
    password VARCHAR(225),
    role VARCHAR(225),
    userName VARCHAR(225),
    phoneNumber VARCHAR(225),
    date DATE,
    stripeCustomerId VARCHAR(225),
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
    stripeProductId VARCHAR(225),
    stripePriceId VARCHAR(225),
	sellerId integer,
    PRIMARY KEY (id),
	CONSTRAINT sellerId
    	FOREIGN KEY(sellerId) 
			REFERENCES person(id)
);

CREATE TABLE credit_card(
    id serial NOT NULL,
    lastFoutDegits VARCHAR(4),
    expiryMonth VARCHAR(2),
    expiryYear VARCHAR(4),
    ownerName VARCHAR(225),
    brand VARCHAR(225),
    customerId VARCHAR(225),
    personId integer,
    PRIMARY KEY(id),
    CONSTRAINT personId
    	FOREIGN KEY(personId) 
			REFERENCES person(id)
)