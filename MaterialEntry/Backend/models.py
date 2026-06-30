from sqlalchemy import Column, Integer, String, Numeric, Text
from database import Base


class Material(Base):
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)

    # required

    material_code = Column(String(20), unique=True, nullable=False)

    material_name = Column(String(100), nullable=False)

    category = Column(String(50), nullable=False)

    uom = Column(String(20), nullable=False)

    standard_rate = Column(Numeric, nullable=False)


    # optional

    material_group = Column(String(50), nullable=True)

    hsn_code = Column(String(20), nullable=True)

    description = Column(Text, nullable=True)

    manufacturer = Column(String(50), nullable=True)

    brand = Column(String(50), nullable=True)

    country = Column(String(50), nullable=True)

    remarks = Column(Text, nullable=True)