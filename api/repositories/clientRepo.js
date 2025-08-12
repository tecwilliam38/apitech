import pool from "../database/db.js"
// import pool from "../database/aiven.js";
// import pool from "../database/neon.js";


async function verificaEmailExistente(email) {
    try {
        const query = 'SELECT count(*) FROM apitech_client WHERE email = $1';
        const result = await pool.query(query, [email]);
        return parseInt(result.rows[0].count) > 0;
    } catch (error) {
        console.error('Erro ao verificar email:', error);
        throw error;
    }
}

async function InserirClient(
    client_name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, endereco_uf, phone_contato, task, email, password, created_at, updated_at
) {
    try {
        const emailJaExiste = await verificaEmailExistente(email);
        if (emailJaExiste) {
            console.log('Email já cadastrado.');
            return { erro: 'Email já cadastrado' };
        }
        const sqlInsert = `
            INSERT INTO apitech_client (client_name, doc_id, endereco_rua, endereco_bairro,
                endereco_cidade, endereco_uf, phone_contato, task, email, password, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, current_timestamp, current_timestamp)
            RETURNING id_client;
        `;

        const result = await pool.query(sqlInsert, [
            client_name, doc_id, endereco_rua, endereco_bairro,
            endereco_cidade, endereco_uf, phone_contato, task, email, password
        ]);

        return result.rows[0]; // Retorna o cliente inserido com id_client
    } catch (error) {
        console.error('Erro ao inserir cliente:', error);
        throw error;
    }
}

async function ProfileClient(id_client) {
    let sql = `select id_client, client_name as cliente, doc_id, endereco_rua, endereco_bairro,
                endereco_cidade, endereco_uf, phone_contato as telefone, task, email, password, created_at, updated_at from apitech_client where id_client = $1`;

    const client = await pool.query(sql, [id_client]);
    return client.rows[0];
}
async function ListarClient() {

    let sql = `select id_client, client_name, doc_id as inep, endereco_rua, endereco_bairro, 
    task as tarefa, endereco_cidade, endereco_uf, phone_contato, email from apitech_client order by client_name`;
    const clients = await pool.query(sql, []);
    return clients.rows;
}
async function ListarClientId(id_client) {

    let sql = `select id_client, client_name, doc_id as inep, endereco_rua, endereco_bairro, 
    task as tarefa, endereco_cidade, endereco_uf, phone_contato, email from apitech_client  
    where id_client = $1`;

    const client = await pool.query(sql, [id_client]);
    return client.rows[0];
}

async function EditarClient(id_client, client_name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, endereco_uf, phone_contato, task, email, password, updated_at) {

    let sql = `update apitech_client set client_name=$1, doc_id=$2, endereco_rua=$3, endereco_bairro=$4,
    endereco_cidade=$5, endereco_uf=$6, phone_contato=$7, task=$8, email=$9, password=$10, updated_at= current_timestamp
where id_client = $11`;

    await pool.query(sql, [client_name, doc_id, endereco_rua, endereco_bairro,
        endereco_cidade, endereco_uf, phone_contato, task, email, password, id_client]);
    return { id_client };
}

async function ExcluirClient(id_client) {

    let sql = `delete from apitech_client where id_client=$1`;

    await pool.query(sql, [id_client]);

    return { id_client };
}

async function BuscarClient(termo) {
    try {
        const sql = `SELECT id_client, client_name, doc_id as inep, endereco_rua, endereco_bairro, 
    task as tarefa, endereco_cidade, phone_contato, email
                     FROM apitech_client
                     WHERE client_name ILIKE $1 
                     OR email ILIKE $1 
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