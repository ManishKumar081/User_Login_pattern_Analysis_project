from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import TIMESTAMP
from sqlalchemy import ForeignKey

from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import INET

from sqlalchemy.sql import func

from database import Base


class User(Base):

    __tablename__ = "users"
    __table_args__ = {"schema": "security"}

    user_id = Column(
        Integer,
        primary_key=True
    )

    username = Column(
        String(100),
        unique=True,
        nullable=False
    )

    password = Column(
        String(225),
        nullable=False
    )

    is_active = Column(
        Boolean,
        default=True
    )

    enter_by = Column(
        String(100)
    )

    entry_date_time = Column(
        TIMESTAMP,
        server_default=func.now()
    )



class UserLoginLog(Base):

    __tablename__ = "user_login_logs"
    __table_args__ = {"schema": "security"}

    log_id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        Integer,
        ForeignKey("security.users.user_id")
    )

    login_time = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    ip_address = Column(INET)

    login_location = Column(
        String(100)
    )

    device = Column(JSONB)

    status = Column(
        String(20)
    )
