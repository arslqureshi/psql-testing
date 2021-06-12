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

CREATE TABLE orders(
    id serial NOT NULL,
    dateOfOrder DATE,
    totalPrice VARCHAR(225),
    buyerId integer,
    driverId integer,
    PRIMARY KEY(id),
    CONSTRAINT buyerId
    	FOREIGN KEY(buyerId) 
			REFERENCES person(id),
    CONSTRAINT driverId
    	FOREIGN KEY(driverId) 
			REFERENCES person(id)
)

CREATE TABLE order_items(
    id serial NOT NULL,
    count integer,
    subTotal VARCHAR(225),
    orderId integer,
    productId integer,
    PRIMARY KEY(id),
    CONSTRAINT orderId
    	FOREIGN KEY(orderId) 
			REFERENCES orders(id),
    CONSTRAINT productId
    	FOREIGN KEY(productId) 
			REFERENCES product(id)
)
CREATE TABLE warehouses(
    id serial NOT NULL,
    city VARCHAR(225),
    address VARCHAR(225),
    details VARCHAR(225),
    price VARCHAR(225),
    lat VARCHAR(225),
    lng VARCHAR(225),
    isRented BOOLEAN,
    ownerId integer,
    PRIMARY KEY(id),
    CONSTRAINT ownerId
    	FOREIGN KEY(ownerId) 
			REFERENCES person(id),  
)

CREATE TABLE conversations(
    id serial NOT NULL,
    user1 integer,
    user2 integer,
    username1 varchar(225),
    username2 varchar(225),
    lastMessageDate Date,
    PRIMARY KEY(id),
    CONSTRAINT user1
        FOREIGN KEY(user1)
            REFERENCES person(id),
    CONSTRAINT user2
        FOREIGN KEY(user2)
            REFERENCES person(id)
)

CREATE TABLE message(
    id serial NOT NULL,
    content text,
    seen BOOLEAN,
    delivered BOOLEAN,
    date DATE,
    filePath VARCHAR(225),
    PRIMARY KEY(id)
)

CREATE TABLE messages (
    id serial NOT NULL,
    conversationId integer,
    messageFrom integer,
    message integer,
    PRIMARY KEY(id),
    CONSTRAINT message
        FOREIGN KEY(message)
            REFERENCES message(id),
    CONSTRAINT messageFrom
        FOREIGN KEY(messageFrom)
            REFERENCES person(id),
    CONSTRAINT messageTo
        FOREIGN KEY(messageTo)
            REFERENCES message(id),
    CONSTRAINT conversationId
        FOREIGN KEY(conversationId)
            REFERENCES conversations(id)
)

CREATE TABLE contract_request(
    id serial NOT NULL,
    requestFrom integer,
    requestTo integer,
    date DATE,
    PRIMARY KEY(id),
    CONSTRAINT requestFrom
        FOREIGN KEY(requestFrom)
            REFERENCES person(id),
    CONSTRAINT requestTo
        FOREIGN KEY(requestTo)
            REFERENCES person(id),        
);

CREATE TABLE warehouse_contract(
    id serial NOT NULL,
    warehouseId integer,
    sellerId integer,
    penaltyAmount VARCHAR(225),
    expiryDate DATE,
    activeDate DATE,
    status VARCHAR(225),
    description text,
    PRIMARY KEY(id),
    CONSTRAINT warehouseId
        FOREIGN KEY(warehouseId)
            REFERENCES warehouses(id),
    CONSTRAINT sellerId
        FOREIGN KEY(sellerId)
            REFERENCES person(id)
)