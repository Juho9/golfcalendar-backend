-- Drop tables if they exist
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS ClubCourses;
DROP TABLE IF EXISTS Club;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Permit;
DROP TABLE IF EXISTS UserReservations;
DROP TABLE IF EXISTS UserPermits;
DROP TABLE IF EXISTS User;

-- Create tables if they do not exist
CREATE DATABASE IF NOT EXISTS calendardb;
USE calendardb;

CREATE TABLE IF NOT EXISTS Club (
    id INT AUTO_INCREMENT,
    clubname VARCHAR(255) NOT NULL,
    nickname VARCHAR(3) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Course (
    id INT AUTO_INCREMENT,
    club_id INT,
    coursename VARCHAR(255) NOT NULL,
    holes INT(2),
    PRIMARY KEY (id),
    FOREIGN KEY (club_id) REFERENCES Club(id)
);

CREATE TABLE IF NOT EXISTS Permit (
    id INT AUTO_INCREMENT,
    nickname VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    username VARCHAR(10) NOT NULL CHECK (LENGTH(username) > 4 AND LENGTH(username) < 10),
    memberNumber DECIMAL(4, 0),
    hcp DECIMAL(3, 1) NOT NULL,
    homeclub INT,
    email VARCHAR(255) NOT NULL,
    passw VARCHAR(255),
    active BOOLEAN,
    deleted BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (homeclub) REFERENCES Club(id)
);

CREATE TABLE IF NOT EXISTS Reservation (
    id INT AUTO_INCREMENT,
    course_id INT NOT NULL,
    creator_id INT NOT NULL,
    player_id INT NOT NULL,
    creationDate DATETIME NOT NULL,
    startTime DATETIME NOT NULL,
    arrived BOOLEAN NOT NULL,
    deleted BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES Course(id),
    FOREIGN KEY (creator_id) REFERENCES User(id),
    FOREIGN KEY (player_id) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS UserPermits (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    permit_id INT NOT NULL,
    startTime DATETIME NOT NULL,
    endTime DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (permit_id) REFERENCES Permit(id)
);

-- Insert data into Club table
INSERT INTO Club (id, clubname, nickname) VALUES
(1, 'Golf Club A', 'A1'),
(2, 'Golf Club B', 'B2');

-- Insert data into Course table
INSERT INTO Course (id, club_id, coursename, holes) VALUES
(1, 1, 'Course A', 18),
(2, 2, 'Course B', 9);

-- Insert data into User table
INSERT INTO User (id, lastname, firstname, username, memberNumber, hcp, homeclub, email, passw, active, deleted) VALUES
(1, 'Doe', 'John', 'johndoe', 1234, 10.5, 1, 'john.doe@email.com', 'password123', true, false),
(2, 'Smith', 'Alice', 'alices', 5678, 15.2, 2, 'alice.smith@email.com', 'password456', true, false),
(3, 'Brown', 'Bob', 'bobbrown', 9876, 8.3, 1, 'bob.brown@email.com', 'password789', false, false);

-- Insert data into Reservation table
INSERT INTO Reservation (id, course_id, creator_id, player_id, creationDate, startTime, arrived, deleted) VALUES
(1, 1, 1, 2, '2024-01-25 10:00:00', '2024-01-26 12:00:00', false, false),
(2, 2, 2, 1, '2024-01-26 08:00:00', '2024-01-27 10:30:00', false, false),
(3, 2, 3, 3, '2024-01-26 08:00:00', '2024-01-27 10:30:00', false, false);

-- Insert data into Permit table
INSERT INTO Permit (id, nickname, isAdmin) VALUES
(1, 'Osakas', false),
(2, 'Pelioikeus', false);

-- Insert data into UserPermits table
INSERT INTO UserPermits (id, user_id, permit_id, startTime) VALUES
(1, 1, 1, '2024-01-25 10:00:00'),
(2, 2, 2, '2024-01-25 10:00:00'),
(3, 1, 2, '2024-01-25 10:00:00');