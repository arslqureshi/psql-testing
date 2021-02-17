import pg from 'pg'

const pool = new  pg.Pool({
     user: "postgres",
     password: "fypdatabase",
     host: "fyp.crek3zbhhhff.us-east-2.rds.amazonaws.com",
     port: "5432",
     database: "fyp"
})

export default pool;

/*
     psql -U postgres = select postgres user in psql
     \l = list all databased
     \c [database name] = select database
     \dt = display all tables in db
*/