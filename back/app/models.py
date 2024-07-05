from sqlalchemy import Column, Integer, String, Text, ForeignKey
from .database import Base

class Vacancy(Base):
    __tablename__ = "vacancies"

    id = Column(Integer, primary_key=True, index=True)
    job_title = Column(String, index=True)
    requirements = Column(Text)
    salary = Column(String)
    work_format = Column(String)

class CandidateVacancy(Base):
    __tablename__ = "candidate_vacancy"

    candidate_id = Column(Integer, ForeignKey("candidates.id"), primary_key=True)
    vacancy_id = Column(Integer, ForeignKey("vacancies.id"), primary_key=True)
