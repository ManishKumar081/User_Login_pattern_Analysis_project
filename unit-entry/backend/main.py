from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Unit(BaseModel):
    unit_code: str
    unit_name: str
    description: str
    status: str

units = []

@app.post("/unit")
def save_unit(data: Unit):

    units.append(data.model_dump())

    return {
        "status": "success",
        "message": "Unit saved successfully",
        "data": data
    }

@app.get("/unit")
def get_units():
    return units