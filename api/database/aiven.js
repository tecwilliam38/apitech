import fs from "fs";
import { Pool } from "pg";

const pool = new Pool({
  user: "avnadmin",
  password: "AVNS_6Re-s-b0Q8q2Fwxyh1M",
  host: "pg-57d15ee-williamfrs-372d.c.aivencloud.com",
  port: 20359, // ou o que estiver no painel
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    // ca: fs.readFileSync("./ca.pem").toString(),
    ca: fs.readFileSync("../../ca.pem").toString(),
  },
  max: 20, // número máximo de conexões simultâneas
  idleTimeoutMillis: 30000, // tempo de espera antes de liberar conexão
});

export default pool;