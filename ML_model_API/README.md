# Drug Demand Forecasting API

A production-ready Drug Demand Forecasting system built using Prophet, FastAPI, Docker, and Python. The application forecasts future demand for commonly prescribed drugs using historical prescription data and exposes predictions through a REST API.

---

# Overview

Healthcare organizations and pharmacies require accurate demand forecasts to optimize inventory management, procurement planning, and supply chain operations.

This project leverages historical prescription demand data to train Prophet-based forecasting models for multiple drugs. Each drug has its own dedicated forecasting model, enabling future demand estimation for customizable forecast horizons. The trained models are served through a FastAPI backend, providing a scalable and easy-to-consume API for healthcare analytics and inventory planning.

---

# Features

* Multi-drug demand forecasting
* Prophet-based time series forecasting
* Dynamic forecast horizon (1–60 months)
* Forecast confidence intervals
* Cumulative demand calculation
* FastAPI REST API
* Pydantic request validation
* Health check endpoints
* Dockerized deployment
* Swagger UI documentation
* Pre-trained model support

---

# Supported Drugs

The API currently supports the following drugs:

* Atorvastatin
* Gabapentin
* Levothyroxine Sodium
* Metformin Hydrochloride
* Paracetamol
* Pregabalin
* Ramipril
* Venlafaxine

---

# Tech Stack

## Machine Learning

* Prophet

## Backend

* FastAPI
* Uvicorn

## Data Processing

* Pandas

## Validation

* Pydantic

## Model Serialization

* Joblib
* Pickle

## Containerization

* Docker

## Language

* Python 3.12

---

# Architecture Flow

```text
Historical Drug Demand Data
            │
            ▼
      Prophet Training
            │
            ▼
     Saved Models (.joblib)
            │
            ▼
         FastAPI API
            │
            ▼
      Forecast Endpoint
            │
            ▼
       JSON Response
```

---

# Project Structure

```text
ML_model_API/
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
│   ├── Levothyroxine Sodium_prophet.joblib
│   ├── Levothyroxine Sodium_prophet.pkl
│   ├── Metformin Hydrochloride_prophet.joblib
│   ├── Metformin Hydrochloride_prophet.pkl
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
└── .gitignore
```

---

# How the System Works

## 1. Data Ingestion

Historical drug demand data is loaded from:

```text
data/nhs_drug_forecasting_dataset_final.csv
```

Dataset fields:

| Column | Description  |
| ------ | ------------ |
| drug   | Drug name    |
| ds     | Date         |
| y      | Demand value |

---

## 2. Model Training

A separate Prophet model is trained for each supported drug.

Configuration:

```python
Prophet(
    yearly_seasonality=True,
    weekly_seasonality=False,
    daily_seasonality=False
)
```

---

## 3. Model Serialization

Each trained model is saved as:

```text
saved_models/*.joblib
saved_models/*.pkl
```

This allows inference without retraining.

---

## 4. Forecast Generation

The model forecasts future demand values and generates:

* Predicted demand
* Lower confidence interval
* Upper confidence interval

---

## 5. API Inference

The FastAPI application loads the appropriate model and returns forecasts based on:

* Drug name
* Forecast horizon

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

## Model Health Check

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
cd ML_model_API
```

## Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / Mac

```bash
python -m venv venv
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Train Models

```bash
python main.py
```

Outputs:

```text
saved_models/
forecasts/drug_forecasts_next_12_months.csv
```

---

## Run FastAPI

```bash
uvicorn app:app --reload
```

Swagger UI:

```text
http://localhost:8000/docs
```

ReDoc:

```text
http://localhost:8000/redoc
```

---

# Sample API Request

```bash
curl -X POST "http://localhost:8000/forecast" \
-H "Content-Type: application/json" \
-d "{\"drug_name\":\"Paracetamol\",\"months\":12}"
```

---

# Docker Deployment

## Build Image

```bash
docker build -t drug-demand-forecasting .
```

## Run Container

```bash
docker run -p 8000:8000 drug-demand-forecasting
```

Swagger UI:

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
