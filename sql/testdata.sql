-- Drop tables if they exist
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS ClubCourses;
DROP TABLE IF EXISTS Club;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS User;

-- Create tables if they do not exist
CREATE DATABASE IF NOT EXISTS calendardb;
USE calendardb;

CREATE TABLE IF NOT EXISTS User (
    id INT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    username VARCHAR(10) NOT NULL CHECK (LENGTH(username) > 4 AND LENGTH(username) < 10),
    memberNumber VARCHAR(4) NOT NULL,
    hcp DECIMAL(3, 1) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passw VARCHAR(255),
    administrator BOOLEAN,
    deleted BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS Club (
    id INT PRIMARY KEY,
    clubname VARCHAR(255) NOT NULL,
    nickname VARCHAR(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS Course (
    id INT PRIMARY KEY,
    coursename VARCHAR(255) NOT NULL,
    holes INT(2)
);

CREATE TABLE IF NOT EXISTS ClubCourses (
    id INT PRIMARY KEY,
    club_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (club_id) REFERENCES Club(id),
    FOREIGN KEY (course_id) REFERENCES Course(id)
);

CREATE TABLE IF NOT EXISTS Reservation (
    id INT PRIMARY KEY,
    course_id INT NOT NULL,
    creator_id INT NOT NULL,
    player_id INT NOT NULL,
    creationDate DATETIME NOT NULL,
    startTime DATETIME NOT NULL,
    deleted BOOLEAN NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Course(id),
    FOREIGN KEY (creator_id) REFERENCES User(id),
    FOREIGN KEY (player_id) REFERENCES User(id)
);

-- Insert sample data
INSERT INTO User (id, firstname, lastname, username, memberNumber, hcp, email, passw, administrator, deleted)
VALUES
  (1, 'John', 'Doe', 'johndoe', '1234', 5.5, 'john.doe@example.com', 'hashed_password', true, false),
  (2, 'Jane', 'Smith', 'janesmith', '2345', 12.3, 'jane.smith@example.com', 'hashed_password', false, false);

INSERT INTO Club (id, clubname, nickname)
VALUES
  (1, 'Golf Club A', 'GA1'),
  (2, 'Golf Club B', 'GB2');

INSERT INTO Course (id, coursename, holes)
VALUES
  (1, 'Course A', 18),
  (2, 'Course B', 9);

INSERT INTO ClubCourses (id, club_id, course_id)
VALUES
  (1, 1, 1),
  (2, 2, 2);

INSERT INTO Reservation (id, course_id, creator_id, player_id, creationDate, startTime, deleted)
VALUES
  (1, 1, 1, 2, '2024-01-23 10:00:00', '2024-01-23 11:00:00', false),
  (2, 2, 2, 1, '2024-01-24 14:00:00', '2024-01-24 15:00:00', false);