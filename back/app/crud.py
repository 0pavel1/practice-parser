import requests
from sqlalchemy.orm import Session
from sqlalchemy import desc
from . import models, schemas

def create_vacancy(db: Session, vacancy: schemas.VacancyCreate):
    db_vacancy = models.Vacancy(
        job_title=vacancy.job_title,
        requirements=vacancy.requirements,
        salary=vacancy.salary,
        work_format=vacancy.work_format,
        url=vacancy.url,
        company=vacancy.company
    )
    db.add(db_vacancy)
    db.commit()
    db.refresh(db_vacancy)
    return db_vacancy

def fetch_vacancies_from_hh(query: schemas.VacancyQuery):
    url = "https://api.hh.ru/vacancies"
    params = {
        "text": query.text,
        "area": query.area,
        "per_page": query.per_page,
        "page": query.page,
    }
    if query.schedule:
        params.update({"schedule": query.schedule})
    if query.salary:
        params.update({"salary": query.salary})
    response = requests.get(url, params=params)
    return response.json()

def create_vacancy_from_hh(db: Session, query: schemas.VacancyQuery):
    data = fetch_vacancies_from_hh(query)
    pages = 0
    for item in data.get("items", []):
        salary_info = item.get("salary", {})
        salary = None
        if salary_info and salary_info.get("from") and salary_info.get("to"):
            salary = f"{salary_info['from']} - {salary_info['to']} {salary_info['currency']}"
        elif salary_info and salary_info.get("from"):
            salary = f"от {salary_info['from']} {salary_info['currency']}"
        elif salary_info and salary_info.get("to"):
            salary = f"до {salary_info['to']} {salary_info['currency']}"
        else:
            salary = "не указана"

        requirement = item.get("snippet", {}).get("requirement", "")
        if requirement == None:
            requirement = "None"

        work_format = item.get("employment", {}).get("name", "")
        if work_format == None:
            work_format = "None"

        url = item.get("alternate_url", "")
        if url == None:
            url = "http://hh.ru"

        company = item.get("employer", {}).get("name", "")
        if company == None:
            company = "None"

        vacancy = schemas.VacancyCreate(
            job_title=item["name"],
            requirements=requirement,
            salary=salary,
            work_format=work_format,
            url=url,
            company=company
        )
        create_vacancy(db, vacancy)
        pages+=1
    return get_vacancies(db, pages)

def get_analytics(db: Session):
    vacancy_count = db.query(models.Vacancy).count()
    return {"vacancies": vacancy_count}

def get_vacancies(db: Session, limit: int):
    return db.query(models.Vacancy).order_by(desc(models.Vacancy.id)).limit(limit).all()