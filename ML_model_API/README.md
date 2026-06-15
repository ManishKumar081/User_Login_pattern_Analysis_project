# Drug Demand Forecasting API

A production-ready drug demand forecasting system built using **Prophet**, **FastAPI**, **Docker**, and **Pydantic**. The project forecasts future demand for commonly prescribed drugs and exposes predictions through a REST API for easy integration into inventory management, supply chain, and healthcare analytics systems.

---

# Project Overview

Healthcare providers and pharmacies require accurate drug demand forecasts to:

* Prevent stock shortages
* Reduce overstocking costs
* Improve procurement planning
* Support inventory optimization
* Enable data-driven supply chain decisions

This project uses historical drug demand data to train separate forecasting models for multiple drugs and serves predictions through a FastAPI backend.

---

# Features

* Multi-drug demand forecasting
* Dynamic forecast horizon (1–60 months)
* Prophet-based time series forecasting
* Forecast confidence intervals
* Cumulative demand calculation
* Input validation using Pydantic
* Health monitoring endpoints
* Dockerized deployment
* Interactive Swagger documentation
* Production-ready REST API

---

# Supported Drugs

The API currently supports forecasting for:

* Atorvastatin
* Gabapentin
* Levothyroxine sodium
* Metformin hydrochloride
* Paracetamol
* Pregabalin
* Ramipril
* Venlafaxine

---

# Tech Stack

## Backend

* FastAPI
* Uvicorn

## Machine Learning

* Prophet

## Data Processing

* Pandas

## Validation

* Pydantic

## Model Serialization

* Joblib
* Pickle

## Containerization

* Docker

## Documentation

* OpenAPI (Swagger)
* ReDoc

## Language

* Python 3.12

---

# Project Structure

```text
drug-demand-forecasting/
│
├── data/
│   └── nhs_drug_forecasting_dataset_final.csv
│
├── forecasts/
│   └── drug_forecasts_next_12_months.csv
│
├── notebooks/
│   └── analysis.ipynb
│
├── saved_models/
│   ├── Atorvastatin_prophet.joblib
│   ├── Atorvastatin_prophet.pkl
│   ├── Gabapentin_prophet.joblib
│   ├── Gabapentin_prophet.pkl
│   ├── Levothyroxine sodium_prophet.joblib
│   ├── Levothyroxine sodium_prophet.pkl
│   ├── Metformin hydrochloride_prophet.joblib
│   ├── Metformin hydrochloride_prophet.pkl
│   ├── Paracetamol_prophet.joblib
│   ├── Paracetamol_prophet.pkl
│   ├── Pregabalin_prophet.joblib
│   ├── Pregabalin_prophet.pkl
│   ├── Ramipril_prophet.joblib
│   ├── Ramipril_prophet.pkl
│   ├── Venlafaxine_prophet.joblib
│   └── Venlafaxine_prophet.pkl
│
├── app.py
├── main.py
├── Dockerfile
├── requirements.txt
├── README.md
│
├── .gitignore
│
├── __pycache__/
│
└── venv/
```

---

# Understanding the Files

## main.py

Responsible for:

* Loading historical demand data
* Training Prophet models
* Saving trained models
* Generating future forecasts
* Exporting forecast results

Outputs:

```text
saved_models/*.joblib
saved_models/*.pkl
forecasts/drug_forecasts_next_12_months.csv
```

---

## app.py

FastAPI application responsible for:

* Request validation
* Model loading
* Forecast generation
* API response handling
* Health checks

Endpoints:

```http
GET  /
GET  /health
GET  /health/model
POST /forecast
```

---

## saved_models/

Contains serialized Prophet models.

Example:

```text
Paracetamol_prophet.joblib
```

Each model is trained independently using historical demand data for a single drug.

---

## data/

Stores the original dataset used during model training.

Expected columns:

```text
drug
ds
y
```

Where:

| Column | Description  |
| ------ | ------------ |
| drug   | Drug name    |
| ds     | Date         |
| y      | Demand value |

---

## forecasts/

Stores generated forecast outputs.

Example:

```text
drug_forecasts_next_12_months.csv
```

---

# Forecasting Pipeline

## Step 1: Load Data

Historical demand data is loaded from:

```text
data/nhs_drug_forecasting_dataset_final.csv
```

---

## Step 2: Train Individual Models

A separate Prophet model is trained for each drug.

Configuration:

```python
Prophet(
    yearly_seasonality=True,
    weekly_seasonality=False,
    daily_seasonality=False
)
```

---

## Step 3: Save Models

Models are serialized and stored as:

```text
saved_models/*.joblib
saved_models/*.pkl
```

---

## Step 4: Generate Forecasts

Each model forecasts future demand values.

Forecast output contains:

* Predicted demand
* Lower confidence interval
* Upper confidence interval

---

## Step 5: Export Forecast Results

Results are exported as:

```text
forecasts/drug_forecasts_next_12_months.csv
```

---

# API Endpoints

## Root Endpoint

### Request

```http
GET /
```

### Response

```json
{
  "message": "Drug Forecast API Running"
}
```

---

## Health Check

### Request

```http
GET /health
```

### Response

```json
{
  "status": "healthy",
  "api": "running"
}
```

---

## Model Health

### Request

```http
GET /health/model
```

### Response

```json
{
  "status": "healthy",
  "models_available": 8
}
```

---

## Forecast Endpoint

### Request

```http
POST /forecast
```

### Payload

```json
{
  "drug_name": "Paracetamol",
  "months": 12
}
```

### Response

```json
{
  "drug": "Paracetamol",
  "forecast_horizon_months": 12,
  "total_forecast_demand": 123456.78,
  "forecast": [
    {
      "ds": "2026-01-01",
      "yhat": 10234.5,
      "yhat_lower": 9800.2,
      "yhat_upper": 10650.4,
      "cumulative_demand": 10234.5
    }
  ]
}
```

---

# Running Locally

## Clone Repository

```bash
git clone <repository-url>
cd drug-demand-forecasting
```

---

## Create Virtual Environment

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Train Models

```bash
python main.py
```

This generates:

```text
saved_models/
forecasts/drug_forecasts_next_12_months.csv
```

---

## Start API

```bash
uvicorn app:app --reload
```

Open:

```text
http://localhost:8000/docs
```

---

# Running with Docker

## Build Docker Image

```bash
docker build -t drug-demand-forecasting .
```

---

## Run Container

```bash
docker run -p 8000:8000 drug-demand-forecasting
```

Open:

```text
http://localhost:8000/docs
```

---

# Docker Hub

Docker Image:

```text
https://hub.docker.com/r/arijeetnath9000/drug-demand-forecasting
```

Pull Image:

```bash
docker pull arijeetnath9000/drug-demand-forecasting:latest
```

Run Container:

```bash
docker run -p 8000:8000 arijeetnath9000/drug-demand-forecasting:latest
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

# Future Improvements

* CI/CD Pipeline using GitHub Actions
* Kubernetes Deployment
* MLflow Model Tracking
* Model Versioning
* Automated Retraining Pipeline
* Logging and Monitoring
* Cloud Deployment (AWS, Azure, GCP)
* Authentication and Authorization
* Real-Time Forecast Monitoring

---

# Author

Drug Demand Forecasting API built using FastAPI, Prophet, Docker, and Python for healthcare demand forecasting and inventory planning.
