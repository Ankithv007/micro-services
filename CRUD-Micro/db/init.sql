-- Create the database
CREATE DATABASE IF NOT EXISTS crud;
USE crud;

-- Create the publisher table
CREATE TABLE IF NOT EXISTS publisher (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    contact VARCHAR(50),
    PRIMARY KEY (id)
);

-- Insert data into publisher
INSERT INTO publisher (id, name, address, contact) VALUES
(1, 'Jaico Publishing House', 'Bangalore', '1234567890'),
(2, 'Westland Publications', 'Delhi', '9876543210'),
(3, 'Penguin Random House India', 'Mumbai', '9988776655'),
(4, 'Rupa Publications', 'Chennai', '8899001122');

-- Create the book table
CREATE TABLE IF NOT EXISTS book (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    date DATE,
    publisher_id INT(11),
    PRIMARY KEY (id),
    FOREIGN KEY (publisher_id) REFERENCES publisher(id)
);

-- Create the review table
CREATE TABLE IF NOT EXISTS review (
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_id INT(11),
    book_id INT(11),
    rating INT(11),
    review_text TEXT,
    date DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (book_id) REFERENCES book(id)
);


-- Create the user for production Docker (nodeuser from any host)
CREATE USER IF NOT EXISTS 'nodeuser'@'%' IDENTIFIED BY 'MySecurePass123!';
GRANT ALL PRIVILEGES ON crud.* TO 'nodeuser'@'%';

-- For local development (root without password, only if needed)
-- Note: This is usually the default in dev containers, but explicitly adding for clarity
GRANT ALL PRIVILEGES ON crud.* TO 'root'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;