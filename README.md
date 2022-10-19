# Spring Systems Developer Challenge

### Viewing the output of this project
To view the output - https://drive.google.com/file/d/1ixxpj71ZAhrIqEQogCxhpM-prgOZ4W8k/view?usp=sharing

### Setting up the project

1. Clone the repo
2. Execute the following commands:
```sh
$ cd frontend
$ npm i
$ cd ../backend
$ npm i
$ npx prisma migrate dev
$ npx prisma migrate deploy
```
3. To start the project:
```sh
# In a new terminal window
$ cd frontend
$ npm start
```
```sh
# In a new terminal window
$ cd backend
$ npm start
```
4. Visit `http://localhost:3000`

### SQL for the database
```sql
CREATE DATABASE companydb
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS public."Company"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    address text COLLATE pg_catalog."default" NOT NULL,
    pin_code character varying(6) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Company_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Company"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public."Employee"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    first_name text COLLATE pg_catalog."default" NOT NULL,
    last_name text COLLATE pg_catalog."default" NOT NULL,
    employer_id text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Employee_pkey" PRIMARY KEY (id),
    CONSTRAINT "Employee_employer_id_fkey" FOREIGN KEY (employer_id)
        REFERENCES public."Company" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Employee"
    OWNER to postgres;
