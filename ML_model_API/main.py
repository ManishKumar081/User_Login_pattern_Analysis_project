import pandas as pd
import joblib
import pickle
from prophet import Prophet
from pathlib import Path

df = pd.read_csv(r"C:\Users\natha\Projects_ML\drug_time_series\prophet_model\nhs_drug_forecasting_dataset_final.csv")

df["ds"] = pd.to_datetime(df["ds"])
df = df.rename(columns={"drug": "unique_id"})

Path("saved_models").mkdir(exist_ok=True)

all_forecasts = []

for drug in df["unique_id"].unique():

    drug_df = (
        df[df["unique_id"] == drug][["ds", "y"]]
        .sort_values("ds")
        .reset_index(drop=True)
    )

    model = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=False,
        daily_seasonality=False
    )

    model.fit(drug_df)

    joblib.dump(
        model,
        f"saved_models/{drug}_prophet.joblib"
    )

    with open(
        f"saved_models/{drug}_prophet.pkl",
        "wb"
    ) as f:
        pickle.dump(model, f)

    future = model.make_future_dataframe(
        periods=12,
        freq="MS"
    )

    forecast = model.predict(future)

    future_forecast = (
        forecast[
            [
                "ds",
                "yhat",
                "yhat_lower",
                "yhat_upper"
            ]
        ]
        .tail(12)
        .copy()
    )

    future_forecast["unique_id"] = drug

    all_forecasts.append(future_forecast)

future_forecasts = pd.concat(
    all_forecasts,
    ignore_index=True
)

future_forecasts = future_forecasts[
    [
        "unique_id",
        "ds",
        "yhat",
        "yhat_lower",
        "yhat_upper"
    ]
]

future_forecasts.to_csv(
    "drug_forecasts_next_12_months.csv",
    index=False
)