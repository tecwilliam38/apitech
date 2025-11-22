import pool from "../database/db.js";
// import pool from "../database/aiven.js";
// import pool from "../database/neon.js";

async function verificaEmailExistente(email) {
    try {
        const query = 'SELECT count(*) FROM apitech_tecnicos WHERE email = $1';
        const result = await pool.query(query, [email]);

        return result.rows[0].count > 0; // Retorna true se o email já existe
    } catch (error) {
        console.error('Erro ao verificar email:', error);
        return false;
    }
}
async function InserirTecnico(name, cel_phone, endereco, email, specialty, password, created_at, updated_at) {
    const emailJaExiste = await verificaEmailExistente(email);
    if (emailJaExiste) {
        console.log('Email já cadastrado.');
        return [];
    }
    const insertQuery = `
        INSERT INTO apitech_tecnicos (name, cel_phone, endereco, email, specialty, password, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, current_timestamp)
        RETURNING id_tecnico
    `;

    try {
        const result = await pool.query(insertQuery, [name, cel_phone, endereco, email, specialty, password]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir:', error);
        throw error;
    }
}

async function ListarByEmail(email) {
    let sql = `select * from apitech_tecnicos where email = $1`;
    try {
        const user = await pool.query(sql, [email]);
        if (user.length == 0)
            return [];
        else
            return user.rows[0];
    } catch (err) {
        console.log(err);
    }
}

async function ProfileTecnico(id_tecnico) {
    let sql = `select id_tecnico, name as tecnico, email, 
    cel_phone as celular, endereco from apitech_tecnicos where id_tecnico = $1`;

    const tecnico = await pool.query(sql, [id_tecnico]);
    return tecnico.rows[0];
}
async function ListarTecnico() {

    let sql = `select id_tecnico, name, email, endereco, 
    cel_phone, specialty as skill from apitech_tecnicos order by name`;

    const tecnicos = await pool.query(sql, []);
    return tecnicos.rows;
}
async function ListarTecnicoId(id_tecnico) {

    let sql = `select id_tecnico, name, email, endereco, password,
    cel_phone, specialty as skill from apitech_tecnicos 
    where id_tecnico = $1`;

    const tecnicos = await pool.query(sql, [id_tecnico]);
    return tecnicos.rows[0];
}

async function EditarTecnico(id_tecnico, name, email, endereco, password, cel_phone, updated_at) {

    let sql = `update apitech_tecnicos set name=$1, email=$2, endereco=$3, password=$4, cel_phone=$5, updated_at=current_timestamp
where id_tecnico = $6`;

    await pool.query(sql, [name, email, endereco, password, cel_phone, id_tecnico]);
    return { id_tecnico };
}

async function ExcluirTecnico(id_tecnico) {

    let sql = `delete from apitech_tecnicos where id_tecnico=$1`;

    await pool.query(sql, [id_tecnico]);

    return { id_tecnico };
}
async function ListarTecnicoServicos(id_tecnico) {
    let sql = `select pts.id_tecnico as tecnico, pts.id_service, s.description as descricao, pts.price as preco
    from apitech_tecnicos_services pts
    join apitech_services s on (s.id_service = pts.id_service)
    where pts.id_tecnico = $1
    order by s.description`;

    const serv_tecnico = await pool.query(sql, [id_tecnico]);

    return serv_tecnico.rows;
}

async function TecnicoSkill(id_tecnico, id_service, price) {
    let sql = `insert into apitech_tecnicos_services (id_tecnico, id_service, price)
    values ($1, $2, $3) returning id_tecnico_service`;

    const skills = await pool.query(sql, [id_tecnico, id_service, price]);
    return skills.rows;
}

export default { InserirTecnico, ListarByEmail, ListarTecnico, ListarTecnicoId, EditarTecnico, ListarTecnicoServicos, ExcluirTecnico, TecnicoSkill }

