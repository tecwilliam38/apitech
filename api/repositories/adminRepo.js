import pool from "../database/db.js";
// import pool from "../database/aiven.js";
// import pool from "../database/neon.js";

async function verificaEmailExistente(email) {
    try {
        const query = 'SELECT count(*) FROM apitech_admin WHERE email = $1';
        const result = await pool.query(query, [email]);

        return result.rows[0].count > 0; // Retorna true se o email já existe
    } catch (error) {
        console.error('Erro ao verificar email:', error);
        return false;
    }
}
async function InserirAdmin(
    name,
    email,
    phone_number,
    password,
    created_at,
    updated_at
) {
    const emailJaExiste = await verificaEmailExistente(email);
    if (emailJaExiste) {
        console.log('Email já cadastrado.');
        return [];
    } else {
        let sql = `insert into apitech_admin(name, email, phone_number, password, created_at, updated_at) 
        values($1, $2, $3, $4, current_timestamp, current_timestamp)
        returning id_admin`;

        try {
            const results = await pool.query(`
                SELECT *
                FROM apitech_admin
                WHERE email = ${email};
                `);
            console.log(results);

            return results.rows;
        } catch (e) {
            const admin = await pool.query(sql, [name, email, phone_number, password]);
            return admin.rows[0];
        }
    }
}

async function ListarByEmailAdmin(email) {
    let sql = `select * from apitech_admin where email = $1`;
    try {
        const userAdmin = await pool.query(sql, [email]);
        if (userAdmin.length == 0)
            return [];
        else
            return userAdmin.rows[0];
    } catch (err) {
        console.log(err);
    }
}

async function ProfileAdmin(id_admin) {

    let sql = `SELECT 
         ad.id_admin, 
         ad.name AS nome, 
         ad.email, 
         ad.phone_number AS telefone 
       FROM apitech_admin AS ad 
       WHERE ad.id_admin = $1`;

    const adminProfile = await pool.query(sql, [id_admin]);

    return adminProfile.rows[0];
}

async function ListarAdmin() {

    let sql = `select id_admin, name, email from apitech_admin order by name`;

    const userAdmin = await pool.query(sql, []);
    return userAdmin.rows;
}

async function EditarAdmin(id_admin, name, email, phone_number, user_adress, user_genre, user_skill) {

    let sql = `update apitech_admin set name=$1, email=$2, phone_number=$3, user_adress=$4, user_genre=$5, user_skill=$6
where id_admin = $7`;

    await pool.query(sql, [name, email, phone_number, user_adress, user_genre, user_skill, id_admin]);
    return { id_admin };
}

async function ExcluirAdmin(id_admin) {

    let sql = `delete from apitech_admin where id_admin=$1`;

    await pool.query(sql, [id_admin]);

    return { id_admin };
}



export default {
    InserirAdmin,
    ListarByEmailAdmin,
    ListarAdmin,
    EditarAdmin,
    ExcluirAdmin,
    ProfileAdmin
};