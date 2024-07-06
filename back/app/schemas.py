from pydantic import BaseModel

class VacancyBase(BaseModel):
    job_title: str
    requirements: str
    salary: str
    work_format: str
    url: str
    company: str

class VacancyCreate(VacancyBase):
    pass

class Vacancy(VacancyBase):
    id: int

    class Config:
        from_attributes = True

class VacancyQuery(BaseModel):
    text: str
    area: int = 1  # Default area is Moscow
    per_page: int = 20
    page: int = 1
    salary: int = 0
    schedule: str
