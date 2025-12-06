import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
     host: 'aws-1-sa-east-1.pooler.supabase.com',     
     user: 'postgres.sgqzrloneflvfhumzwpt',     
     database: 'postgres',
     password: 'Estacio091@@',
     port: 6543,
});
// const pool = new Pool({
//      user: 'postgres.yulykztzhmoxfztykeop',     
//      host: 'aws-0-sa-east-1.pooler.supabase.com',     
//      database: 'postgres',
//      password: 'Estacio091@@',
//      port: 6543,
// });

export default pool;
