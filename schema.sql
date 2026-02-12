CREATE TABLE reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    guests INT,
    date DATE,
    time TIME
);
