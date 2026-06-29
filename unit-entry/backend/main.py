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
next_id = 1


@app.post("/unit")
def save_unit(data: Unit):
    global next_id

    unit = {
        "id": next_id,
        "unit_code": data.unit_code,
        "unit_name": data.unit_name,
        "description": data.description,
        "status": data.status,
    }

    units.append(unit)
    next_id += 1

    return {
        "status": "success",
        "message": "Unit saved successfully",
        "data": unit,
    }


@app.get("/unit")
def get_units():
    return units


@app.put("/unit/{unit_id}")
def update_unit(unit_id: int, data: Unit):

    for unit in units:
        if unit["id"] == unit_id:
            unit["unit_code"] = data.unit_code
            unit["unit_name"] = data.unit_name
            unit["description"] = data.description
            unit["status"] = data.status

            return {
                "status": "success",
                "message": "Unit updated successfully",
            }

    return {
        "status": "error",
        "message": "Unit not found",
    }


@app.delete("/unit/{unit_id}")
def delete_unit(unit_id: int):

    global units

    units = [
        unit
        for unit in units
        if unit["id"] != unit_id
    ]

    return {
        "status": "success",
        "message": "Unit deleted successfully",
    }