import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
     host: 'aws-1-sa-east-1.pooler.supabase.com',     
     user: 'postgres.cfnqsikankipkyfzypmr',     
     database: 'postgres',
     password: 'Estacio091@@',
     port: 6543,
     pool_mode: 'transaction',
});

export default pool;
