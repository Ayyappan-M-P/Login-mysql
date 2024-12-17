CREATE DATABASE IF NOT EXISTS employeemanagement;

USE employeemanagement;

CREATE TABLE IF NOT EXISTS Employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    employee_id VARCHAR(10) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL,
    department VARCHAR(50) NOT NULL,
    date_of_joining DATE NOT NULL,
    role VARCHAR(50) NOT NULL
);
