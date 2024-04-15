import cliente from 'pg'

const { Pool } = cliente;

const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'crudSem',
  password: 'josecastanonch',
  port: 5432
});

// const pool = new Pool ({ 
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });

export {
    pool
};