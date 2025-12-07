import pool from "../database/db.js"
// import pool from "../database/aiven.js";
// import pool from "../database/neon.js";


async function verificaEmailExistente(email) {
    try {
        const query = 'SELECT count(*) FROM client WHERE client_email = $1';
        const result = await pool.query(query, [email]);
        return parseInt(result.rows[0].count) > 0;
    } catch (error) {
        console.error('Erro ao verificar email:', error);
        throw error;
    }
}

async function InserirClient(
    client_name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, phone_contato, task, client_email, client_password, created_at, updated_at
) {
    try {
        const emailJaExiste = await verificaEmailExistente(client_email);
        if (emailJaExiste) {
            console.log('Email já cadastrado.');
            return { erro: 'Email já cadastrado' };
        }
        const sqlInsert = `
            INSERT INTO client (client_name, doc_id, endereco_rua, endereco_bairro,
                endereco_cidade, phone_contato, task, client_email, client_password, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, current_timestamp, current_timestamp)
            RETURNING id_client;
        `;

        const result = await pool.query(sqlInsert, [
            client_name, doc_id, endereco_rua, endereco_bairro,
            endereco_cidade, phone_contato, task, client_email, client_password
        ]);

        return result.rows[0]; // Retorna o cliente inserido com id_client
    } catch (error) {
        console.error('Erro ao inserir cliente:', error);
        throw error;
    }
}

async function ProfileClient(id_client) {
    let sql = `select id_client, client_name as cliente, doc_id, endereco_rua, endereco_bairro,
               endereco_cidade, phone_contato as telefone, task, client_email as email,
               client_password as password, created_at, updated_at from client where id_client = $1`;

    const client = await pool.query(sql, [id_client]);
    return client.rows[0];
}
async function ListarClient() {

    let sql = `select id_client, client_name, doc_id as inep, endereco_rua, endereco_bairro, 
    task as tarefa, endereco_cidade, phone_contato, client_email as email from client order by client_name`;
    const clients = await pool.query(sql, []);
    return clients.rows;
}
async function ListarClientId(id_client) {

    let sql = `select id_client, client_name, doc_id as inep, endereco_rua, endereco_bairro, 
    task as tarefa, endereco_cidade, phone_contato, client_email as email from client  
    where id_client = $1`;

    const client = await pool.query(sql, [id_client]);
    return client.rows[0];
}

async function EditarClient(id_client, client_name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, phone_contato, task, client_email, client_password, updated_at) {

    let sql = `update client set client_name=$1, doc_id=$2, endereco_rua=$3, endereco_bairro=$4,
    endereco_cidade=$5, phone_contato=$6, task=$7, client_email=$8, client_password=$9, updated_at= current_timestamp
where id_client = $10`;
    await pool.query(sql, [client_name, doc_id, endereco_rua, endereco_bairro,
        endereco_cidade, phone_contato, task, client_email, client_password, id_client]);
    return { id_client };
}

async function ExcluirClient(id_client) {

    let sql = `delete from client where id_client=$1`;

    await pool.query(sql, [id_client]);

    return { id_client };
}

async function BuscarClient(termo) {
    try {
        const sql = `SELECT id_client, client_name, doc_id as inep, endereco_rua, endereco_bairro, 
    task as tarefa, endereco_cidade, phone_contato, client_email as email
                     FROM client
                     WHERE client_name ILIKE $1 
                     OR client_email ILIKE $1 
                     OR endereco_rua ILIKE $1 
                     OR endereco_bairro ILIKE $1 
                     OR endereco_cidade ILIKE $1 
                     OR phone_contato ILIKE $1
`;
        const resultado = await pool.query(sql, [`%${termo}%`]);
        return resultado.rows;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
}

export default { InserirClient, ProfileClient, ListarClient, ListarClientId, ExcluirClient, BuscarClient, EditarClient }