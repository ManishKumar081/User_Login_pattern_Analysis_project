from sqlalchemy import Column, Integer, String
from database import Base

class Supplier(Base):
    __tablename__ = "supplier_master"

    supplier_id = Column(Integer, primary_key=True, index=True)
    supplier_name = Column(String(100), nullable=False)
    address = Column(String, nullable=False)