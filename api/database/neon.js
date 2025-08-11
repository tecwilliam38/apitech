import { Pool } from "pg";
const URL = 'postgresql://neondb_owner:npg_nMLpeEIz0l5K@ep-summer-morning-acw5r4fj-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';


const pool = new Pool({
  connectionString: URL,
  ssl: {
    rejectUnauthorized: false, // Neon usa SSL obrigatório
  },
});

export default pool;
