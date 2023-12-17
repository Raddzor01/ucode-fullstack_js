USE ucode_web;
CREATE TABLE IF NOT EXISTS heroes(
       id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(32) NOT NULL UNIQUE,
       description TEXT NOT NULL,
       class_role ENUM('tankman', 'healer', 'dps') NOT NULL
);