from fastapi import FastAPI, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import SessionLocal
from models import Supplier

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Model
class SupplierCreate(BaseModel):
    supplier_name: str
    address: str


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Save Supplier
@app.post("/supplier")
def save_supplier(data: SupplierCreate, db: Session = Depends(get_db)):

    # Format input
    supplier_name = data.supplier_name.strip().title()
    address = data.address.strip().title()

    # Check if supplier already exists (case-insensitive)
    existing_supplier = db.query(Supplier).filter(
        func.lower(Supplier.supplier_name) == supplier_name.lower()
    ).first()

    if existing_supplier:
        return {
            "status": "error",
            "message": "Supplier already exists"
        }

    # Create new supplier
    supplier = Supplier(
        supplier_name=supplier_name,
        address=address
    )

    db.add(supplier)
    db.commit()
    db.refresh(supplier)

    return {
        "status": "success",
        "message": "Supplier saved successfully",
        "data": {
            "supplier_id": supplier.supplier_id,
            "supplier_name": supplier.supplier_name,
            "address": supplier.address
        }
    }


# Get All Suppliers
@app.get("/supplier")
def get_suppliers(db: Session = Depends(get_db)):
    suppliers = db.query(Supplier).order_by(Supplier.supplier_id).all()

    return [
        {
            "supplier_id": supplier.supplier_id,
            "supplier_name": supplier.supplier_name,
            "address": supplier.address
        }
        for supplier in suppliers
    ]