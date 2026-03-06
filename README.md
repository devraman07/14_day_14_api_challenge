# 14_day_14_api_challenge

Overview

This repository documents my 14 Days – 14 APIs Challenge, where I build one backend API every day for 14 days using Node.js, Express, and PostgreSQL.

The goal of this challenge is to strengthen my backend development skills by focusing on consistent coding, system design, and real-world backend concepts.

Instead of watching tutorials, I am building APIs daily to develop implementation ability, debugging skills, and backend architecture understanding.

🎯 Objectives

Improve backend coding ability through daily practice

Strengthen understanding of REST API design

Learn PostgreSQL and relational database design

Implement real backend features such as:

Authentication

Authorization

Pagination

Search

Validation

Logging

Security

Build consistency and discipline as a developer

Create a strong GitHub portfolio

🛠 Tech Stack

Backend

Node.js

Express.js

Database

PostgreSQL

Language

JavaScript

Tools

Postman / Thunder Client

Git & GitHub

Libraries

pg

bcrypt

jsonwebtoken

multer

zod

cors

helmet

express-rate-limit

📂 Project Structure
14-days-14-apis
│
├── day-01-user-crud-api
├── day-02-todo-api
├── day-03-authentication-api
├── day-04-authorization-system
├── day-05-pagination-api
├── day-06-search-api
├── day-07-file-upload-api
├── day-08-validation-api
├── day-09-error-handling
├── day-10-logging-system
├── day-11-security-api
├── day-12-database-relations
├── day-13-sql-joins
└── day-14-final-mini-project

Each folder contains a complete working API for that day's challenge.

📅 Challenge Roadmap
Day	API	Concepts
Day 1	User CRUD API	REST, SQL CRUD
Day 2	Todo API	Filtering, schema design
Day 3	Authentication API	JWT, password hashing
Day 4	Authorization System	Roles & middleware
Day 5	Pagination API	Query params, LIMIT/OFFSET
Day 6	Search API	SQL search queries
Day 7	File Upload API	Multer
Day 8	Validation System	Zod
Day 9	Error Handling	Global middleware
Day 10	Logging System	Winston
Day 11	Security API	Helmet, CORS, rate limiting
Day 12	Database Relations	Foreign keys
Day 13	SQL Joins	Relational queries
Day 14	Final Backend Project	Full system integration
📌 Day 1 – User CRUD API
Features

Create a user

Get all users

Get user by ID

Update user

Delete user

Example Routes
POST   /users
GET    /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
Database Table
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 name TEXT,
 email TEXT UNIQUE,
 age INT
);
💡 What I’m Learning

Through this challenge I am focusing on:

Writing backend code daily

Designing clean APIs

Structuring backend projects

Debugging errors independently

Understanding how real backend systems work

📈 Progress Tracker

Day 1 – User CRUD API

Day 2 – Todo API

Day 3 – Authentication API

Day 4 – Authorization

Day 5 – Pagination

Day 6 – Search

Day 7 – File Upload

Day 8 – Validation

Day 9 – Error Handling

Day 10 – Logging

Day 11 – Security

Day 12 – Database Relationships

Day 13 – SQL Joins

Day 14 – Final Project

🧠 Motivation

The goal of this challenge is simple:

Consistency over perfection.

Building something every day for 14 days helps transform knowledge into real engineering ability.

👨‍💻 Author

Raman Patra

Backend Developer | MERN Stack
B.Tech – Sister Nivedita University

⭐ If you like this project

Give the repository a star and follow the progress of the challenge!


