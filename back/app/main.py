from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/analytics/")
def get_analytics(db: Session = Depends(get_db)):
    return crud.get_analytics(db)

@app.post("/fetch-vacancies/")
def fetch_vacancies(query: schemas.VacancyQuery, db: Session = Depends(get_db)):
    return crud.create_vacancy_from_hh(db, query)

