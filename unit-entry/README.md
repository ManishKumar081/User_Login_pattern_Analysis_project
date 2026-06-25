# Unit Entry Module

## Module Description

The Unit Entry Module is designed to manage measurement units used throughout the Stock Management System. This module allows users to create, edit, view, search, and delete unit records through a user-friendly interface.

The application is developed using React.js for the frontend and FastAPI for the backend.

---

## Features Implemented

### Frontend

* Professional React User Interface
* Unit Code Entry
* Unit Name Entry
* Description Entry
* Status Management (Active / Inactive)
* Search Functionality
* Edit Existing Units
* Delete Units
* Responsive Layout
* Material UI Components

### Backend Features

* FastAPI REST API
* POST API for Saving Unit Details
* GET API for Retrieving Unit Details
* CORS Configuration for Frontend Integration
* In-Memory Data Storage for Demonstration

---

## Integration

* Axios Integration
* Frontend and Backend Communication
* API Testing Completed

---

## Technology Stack

### Frontend

* React.js
* JavaScript
* Material UI (MUI)
* HTML
* CSS
* Axios
* React Router

### Backend

* FastAPI
* Python
* Uvicorn

---

## Project Structure

Unit_Entry

├── backend

│ └── main.py

│

├── src

│ ├── components

│ ├── data

│ ├── pages

│ ├── App.jsx

│ └── main.jsx

│

├── package.json

├── package-lock.json

├── README.md

└── vite.config.js

---

## API Endpoints

### Save Unit

POST /unit

### Sample Request

```json
{
  "unit_code": "KG",
  "unit_name": "Kilogram",
  "description": "Unit of Weight",
  "status": "Active"
}
```

### Get Units

GET /unit

### Sample Response

```json
[
  {
    "unit_code": "KG",
    "unit_name": "Kilogram",
    "description": "Unit of Weight",
    "status": "Active"
  }
]
```

---

## Validation Rules

* Unit Code is required
* Unit Name is required
* Empty submissions are not allowed

---

## Functionalities

* Add New Unit
* View Unit List
* Search Units
* Edit Unit Details
* Delete Units
* Manage Active / Inactive Status

---

## Testing Status

* UI Testing Completed
* Form Validation Tested
* API Integration Tested
* POST API Tested
* GET API Tested
* End-to-End Testing Completed

---

## Assigned Task

Module: Unit Entry

Status: Completed and Ready for Integration
