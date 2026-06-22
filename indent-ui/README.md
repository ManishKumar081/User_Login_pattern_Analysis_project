# Indent Management Module

A module for raising, verifying, and tracking material indent requests with supporting document uploads.

## Features

- **Indent Form** — Submit a new indent request with department, material, quantity, priority, and a supporting PDF document.
- **Indent Verification** — Review submitted indents, view uploaded documents, and Approve or Reject with remarks.

## Tech Stack

- **Backend:** Spring Boot, PostgreSQL, MinIO (object storage for PDFs)
- **Frontend:** React, Axios

## Folder Structure
    indent-ui/

    ├── backend/     → Spring Boot REST API

    └── frontend/    → React application
## Backend Setup

1. Ensure PostgreSQL is running and a database named `indentdb` exists.
2. Ensure MinIO is running (Docker) on port 9000.
3. Update `src/main/resources/application.properties` with your DB and MinIO credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/indentdb
spring.datasource.username=postgres
spring.datasource.password=your_password

minio.url=http://localhost:9000
minio.access-key=your_access_key
minio.secret-key=your_secret_key
minio.bucket-name=indent-documents
```

4. Run the application:

```bash
mvn spring-boot:run
```

Server starts on `http://localhost:8080`

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs on `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/indents` | Submit new indent with PDF document |
| GET | `/api/indents` | Get all indents |
| GET | `/api/indents/{id}` | Get a single indent by ID |
| PUT | `/api/indents/{id}/verify` | Approve or Reject an indent |
| GET | `/api/indents/health` | Health check |

## Pages

### 1. New Indent (Indent Form)

Form fields:
- Department (dropdown)
- Priority — Normal / Urgent
- Material Name
- Quantity + Unit
- Purpose / Remarks
- Supporting Document (PDF upload)

On submit, the PDF is uploaded to MinIO and the indent record is saved to PostgreSQL with status `PENDING`.

### 2. Indent Verification

- Lists all indents with filter tabs: All / Pending / Approved / Rejected
- Click any row to open full details, including a link to view the uploaded PDF
- Verifier can Approve or Reject a pending indent with mandatory remarks

## Status Flow

    PENDING → APPROVED
    PENDING → REJECTED