from sqlalchemy import Column, Integer, String, Text, ForeignKey
from .database import Base

class Vacancy(Base):
    __tablename__ = "vacancies"

    id = Column(Integer, primary_key=True, index=True)
    job_title = Column(String, index=True)
    requirements = Column(Text)
    salary = Column(String)
    work_format = Column(String)
    url = Column(Text)
    company = Column(Text)

