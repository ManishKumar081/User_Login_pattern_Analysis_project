from pydantic import BaseModel
from typing import Optional


class MaterialCreate(BaseModel):

    # required

    material_code: str

    material_name: str

    category: str

    uom: str

    standard_rate: float


    # optional

    material_group: Optional[str] = None

    hsn_code: Optional[str] = None

    description: Optional[str] = None

    manufacturer: Optional[str] = None

    brand: Optional[str] = None

    country: Optional[str] = None

    remarks: Optional[str] = None