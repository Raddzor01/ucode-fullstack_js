USE ucode_web;

CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT,
    login varchar(30) UNIQUE NOT NULL,
    password varchar(256) NOT NULL,
    full_name varchar(256) NOT NULL,
    email varchar(256) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);