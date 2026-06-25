# User Authentication Module

## Description

This module handles user authentication for the User Login Pattern Analysis project. It is responsible for validating user login credentials and recording login activity.

The module is developed using FastAPI and PostgreSQL. It provides an API endpoint that receives a username and password, verifies the credentials against the database, and returns a login response.

In addition to authentication, successful login attempts are recorded in a login log table along with information such as IP address, login time, device details, and login status.



## Integration with Main Project

The authentication module acts as the entry point of the application.

The frontend login page sends user credentials to the backend API. The API validates the credentials using data stored in PostgreSQL and returns the login result. Login activity is then stored in the database for future analysis by other components of the project.

---

## Technologies Used

* Python 3.12
* FastAPI
* SQLAlchemy
* PostgreSQL
* Passlib (bcrypt)
* Uvicorn

---

## Prerequisites

Before running the application, make sure the following software is installed:

* Python 3.12 or later
* PostgreSQL
* Git

---

## Dependencies

The following Python packages are required:

* fastapi
* uvicorn
* sqlalchemy
* psycopg2-binary
* passlib[bcrypt]
* pydantic

Install dependencies using:

```bash
pip install -r requirements.txt
```

---

## Running the Application

Create and activate a virtual environment.

Install all required dependencies.

Start the application using:

```bash
python -m uvicorn main:app --reload
```

The application will start on:

http://127.0.0.1:8000

Swagger documentation is available at:

http://127.0.0.1:8000/docs

---

## Environment Variables

The application requires a PostgreSQL database connection string.

Example:

DATABASE_URL=postgresql://postgres:<password>@localhost/login_db

---

## Database Setup

1. Install PostgreSQL.
2. Create a database named `login_db`.
3. Create the required tables:

   * users
   * user_login_logs
4. Insert user records with bcrypt hashed passwords for testing and authentication.

---

## Features Implemented

* User login API using FastAPI
* Username and password validation
* Password verification using bcrypt hashing
* PostgreSQL database integration
* Login activity logging
* Swagger API testing support
* Structured project setup using SQLAlchemy ORM

