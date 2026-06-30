# Material Entry

## Overview

Material Entry is a full-stack web application developed for storing and managing material information through a user interface connected with backend APIs and database.

The application allows users to enter material details and save records in PostgreSQL database.

---

## Features

- Material Entry Form Interface  
- Required and Optional Field Handling  
- FastAPI REST API Integration  
- PostgreSQL Database Storage  
- Frontend-Backend Communication using Axios  
- API Testing using Swagger UI  
- Duplicate Entry Validation  

---

## Tech Stack

**Frontend**
- React.js  
- Vite  
- CSS  
- Axios  

**Backend**
- Python  
- FastAPI  
- SQLAlchemy  
- Pydantic  

**Database**
- PostgreSQL  

---

## Project Structure

```text
MaterialEntry/
│
├── Backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   └── schemas.py
│
├── Frontend/
│
├── requirements.txt
└── README.md
```

---

## API Endpoint

```http
POST /material
```

Sample Request

```json
{
  "material_code": "M101",
  "material_name": "Steel Rod",
  "category": "Metal",
  "uom": "Kg",
  "standard_rate": 100
}
```

---

## Setup

### Backend

Install dependencies

```bash
pip install -r requirements.txt
```

Run server

```bash
uvicorn main:app --reload
```

---

### Frontend

Install dependencies

```bash
npm install
```

Run application

```bash
npm run dev
```

---

## Status

- Frontend Completed  
- Backend Completed  
- Database Connected  
- API Tested Successfully  
