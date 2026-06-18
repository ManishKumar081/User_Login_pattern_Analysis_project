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

class Supplier(BaseModel):
    supplier_name: str
    address: str

suppliers = []

@app.post("/supplier")
def save_supplier(data: Supplier):

    suppliers.append(data.dict())

    return {
        "status": "success",
        "message": "Supplier saved successfully",
        "data": data
    }

@app.get("/supplier")
def get_suppliers():
    return suppliers