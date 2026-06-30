from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base
from models import Material
from schemas import MaterialCreate


#Base.metadata.create_all(bind=engine)


app = FastAPI()


# cors

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# database dependency

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# home route

@app.get("/")

def home():

    return {
        "message": "Backend running"
    }


# create material

@app.post("/material")

def create_material(
    material: MaterialCreate,
    db: Session = Depends(get_db)
):

    # duplicate check

    existing = db.query(Material).filter(
        Material.material_code == material.material_code
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Material Code already exists"
        )


    new_material = Material(

        material_code=material.material_code,
        material_name=material.material_name,
        category=material.category,
        uom=material.uom,
        standard_rate=material.standard_rate,

        material_group=material.material_group,
        hsn_code=material.hsn_code,
        description=material.description,
        manufacturer=material.manufacturer,
        brand=material.brand,
        country=material.country,
        remarks=material.remarks
    )


    db.add(new_material)

    db.commit()

    db.refresh(new_material)


    return {
        "message": "Saved successfully"
    }


# report page later

@app.get("/materials")

def get_materials(db: Session = Depends(get_db)):

    materials = db.query(Material).all()

    return materials