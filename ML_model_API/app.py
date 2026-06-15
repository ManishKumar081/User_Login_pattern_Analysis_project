from fastapi import FastAPI
from pydantic import BaseModel, Field, field_validator
from typing import List
import joblib
import traceback
from pathlib import Path

app = FastAPI(
    title="Drug Demand Forecasting API",
)

MODEL_DIR = Path("saved_models")


# -----------------------
# Health Checks
# -----------------------

@app.get("/")
def home():
    return {
        "message": "Drug Forecast API Running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "api": "running"
    }


@app.get("/health/model")
def model_health():
    try:
        if not MODEL_DIR.exists():
            return {
                "status": "unhealthy",
                "reason": "Model directory not found"
            }

        model_files = list(MODEL_DIR.glob("*.joblib"))

        return {
            "status": "healthy",
            "model_directory": str(MODEL_DIR),
            "models_available": len(model_files),
            "model_names": [m.stem for m in model_files]
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }


# -----------------------
# Request Schemas
# -----------------------

class ForecastRequest(BaseModel):
    drug_name: str = Field(
        ...,
        min_length=1,
        description="Drug code (e.g. Paracetamol)"
    )

    '''VALID_DRUGS = {
    "Atorvastatin",
    "Gabapentin",
    "Levothyroxine sodium",
    "Metformin hydrochloride",
    "Paracetamol",
    "Pregabalin",
    "Ramipril",
    "Venlafaxine"
    }
    '''

    months: int = Field(
        ...,
        gt=0,
        le=60,
        description="Forecast horizon in months"
    )

    @field_validator("drug_name")
    @classmethod
    def validate_drug_name(cls, value):
        return value.strip().title()


class ForecastPoint(BaseModel):
    ds: str
    yhat: float
    yhat_lower: float
    yhat_upper: float
    cumulative_demand: float


class ForecastResponse(BaseModel):
    drug: str
    forecast_horizon_months: int
    total_forecast_demand: float
    forecast: List[ForecastPoint]


# -----------------------
# Forecast Endpoint
# -----------------------

@app.post(
    "/forecast",
    response_model=ForecastResponse
)
def forecast(req: ForecastRequest):

    try:
        model_path = MODEL_DIR / f"{req.drug_name}_prophet.joblib"

        if not model_path.exists():
            return {
                "error": f"Model not found for drug '{req.drug_name}'"
            }

        model = joblib.load(model_path)

        future = model.make_future_dataframe(
            periods=req.months,
            freq="MS"
        )

        forecast_df = model.predict(future)

        result = (
            forecast_df[
                [
                    "ds",
                    "yhat",
                    "yhat_lower",
                    "yhat_upper"
                ]
            ]
            .tail(req.months)
            .copy()
        )

        result["cumulative_demand"] = result["yhat"].cumsum()
        result["ds"] = result["ds"].astype(str)

        return ForecastResponse(
            drug=req.drug_name,
            forecast_horizon_months=req.months,
            total_forecast_demand=float(result["yhat"].sum()),
            forecast=result.to_dict(orient="records")
        )

    except Exception as e:
        return {
            "error": "Prediction function crashed",
            "error_type": type(e).__name__,
            "error_message": str(e),
            "traceback": traceback.format_exc()
        }