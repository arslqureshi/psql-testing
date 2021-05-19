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
    stripeConnectedAccountId VARCHAR(225),
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
    lastFourDigits VARCHAR(4),
    expiryMonth VARCHAR(2),
    expiryYear VARCHAR(4),
    ownerName VARCHAR(225),
    brand VARCHAR(225),
    stripeCardId VARCHAR(225),
    customerId VARCHAR(225),
    personId integer,
    PRIMARY KEY(id),
    CONSTRAINT personId
    	FOREIGN KEY(personId) 
			REFERENCES person(id)
)

CREATE TABLE order(
    id serial NOT NULL,
    dateOfOrder DATE,
    totalPrice VARCHAR(225)
    buyerId integer,
    driverId integer,
    PRIMARY KEY(id),
    CONSTRAINT buyerId
    	FOREIGN KEY(buyerId) 
			REFERENCES person(id)
    CONSTRAINT driverId
    	FOREIGN KEY(driverId) 
			REFERENCES person(id)
)

CREATE TABLE order_items(
    id serial NOT NULL,
    count integer,
    subTotal VARCHAR(225)
    orderId integer,
    productId integer,
    PRIMARY KEY(id),
    CONSTRAINT orderId
    	FOREIGN KEY(orderId) 
			REFERENCES order(id)
    CONSTRAINT productId
    	FOREIGN KEY(productId) 
			REFERENCES product(id)
)