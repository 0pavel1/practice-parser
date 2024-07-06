CREATE TABLE vacancies (
    id SERIAL PRIMARY KEY,
    job_title VARCHAR(255),
    requirements TEXT,
    salary VARCHAR(255),
    work_format VARCHAR(255),
    url TEXT,
    company TEXT
);