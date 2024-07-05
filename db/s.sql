CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    skills TEXT,
    experience TEXT,
    education TEXT
);

CREATE TABLE vacancies (
    id SERIAL PRIMARY KEY,
    job_title VARCHAR(255),
    requirements TEXT,
    salary VARCHAR(255),
    work_format VARCHAR(255)
);

CREATE TABLE candidate_vacancy (
    candidate_id INT REFERENCES candidates(id),
    vacancy_id INT REFERENCES vacancies(id)
);
