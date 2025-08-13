import pool from "../database/db.js";
// import pool from "../database/aiven.js";
// import pool from "../database/neon.js";



async function ListarAll(id_client, dt_start, dt_end, id_tecnico, status) {
    let filtro = [];

    let sql = `SELECT pa.id_appointment, pa.id_tecnico, ps.description AS service, 
    pt.name AS tecnico, pt.specialty, pa.booking_date, pa.booking_hour, 
    pts.price AS preco, pc.client_name AS cliente,
    pa.id_service, pa.status, pa.id_client
    FROM apitech_appointments pa
    JOIN apitech_services ps ON ps.id_service = pa.id_service
    JOIN apitech_tecnicos pt ON pt.id_tecnico = pa.id_tecnico
    JOIN apitech_client pc ON pc.id_client = pa.id_client
    JOIN apitech_tecnicos_services pts ON pts.id_tecnico = pa.id_tecnico 
                                       AND pts.id_service = pa.id_service
    WHERE pa.id_appointment > 0`;

    if (id_client) {
        filtro.push(id_client);
        sql += ` AND pa.id_client = $${filtro.length}`;
    } else {
        //  
    }

    if (dt_start) {
        filtro.push(dt_start);
        sql += ` AND pa.booking_date >= $${filtro.length}`;
    }

    if (dt_end) {
        filtro.push(dt_end);
        sql += ` AND pa.booking_date <= $${filtro.length}`;
    }

    if (id_tecnico !== null) {
        filtro.push(id_tecnico);
        sql += ` AND pa.id_tecnico = \$${filtro.length}`;
    }


    sql += " ORDER BY pa.booking_date, pa.booking_hour";

    try {
        const resultado = await pool.query(sql, filtro);
        return resultado.rows;
    } catch (erro) {
        console.error('Erro ao buscar agendamentos:', erro);
        throw erro;
    }
}

async function ListarTecnico(id_tecnico) {

    let sql = `select pa.id_appointment, pa.id_tecnico, ps.description as service, 
    pt.name as tecnico, pt.specialty,
   pa.booking_date, pa.booking_hour, pts.price as preco, pc.client_name as cliente,
   pa.id_service, pa.status, pa.id_client
   from apitech_appointments pa
   join apitech_services ps on (ps.id_service = pa.id_service)
   join apitech_tecnicos pt on (pt.id_tecnico = pa.id_tecnico)
   join apitech_client pc on (pc.id_client = pa.id_client)
   join apitech_tecnicos_services pts on (pts.id_tecnico = pa.id_tecnico and 
                          pts.id_service = pa.id_service)
   WHERE pa.id_appointment > 0
   AND pa.id_tecnico = $1
   order by pa.id_tecnico;`

    const appointments = await pool.query(sql, [id_tecnico]);
    return appointments.rows;
}

async function ListarId(id_appointment) {

    let sql = `select pa.id_appointment, s.description as service, 
    pt.name as tecnico, pt.specialty,
    pa.booking_date, pa.booking_hour, pc.client_name as client, pts.price, pa.id_tecnico, 
    pa.id_service,pa.status, pa.id_client
    from apitech_appointments pa
    join apitech_services s on (s.id_service = pa.id_service)
    join apitech_tecnicos pt on (pt.id_tecnico = pa.id_tecnico)
    join apitech_client pc on (pc.id_client = pa.id_client)
    left join apitech_tecnicos_services pts on (pts.id_tecnico = pa.id_tecnico and 
                            pts.id_service = pa.id_service)
    where pa.id_appointment = $1
    order by pa.booking_date, pa.booking_hour  `;

    const appointments = await pool.query(sql, [id_appointment]);

    return appointments.rows[0];
}

async function Inserir(id_client, id_tecnico, id_service, status, booking_date, booking_hour) {

    let sql = `insert into apitech_appointments(id_client,
         id_tecnico, id_service, status, booking_date, booking_hour) 
         values($1, $2, $3, $4, $5, $6) returning id_appointment`;
    try {
        const appointment = await pool.query(sql, [id_client,
            id_tecnico, id_service, status, booking_date, booking_hour]);

        return appointment.rows[0];
    } catch (err) {
        console.error("Erro ao inserir agendamento:", err);
        throw err; // ou return { success: false, error: err.message };
    }
}

async function Editar(id_appointment, id_client,
    id_tecnico, id_service, status, booking_date, booking_hour) {

    let sql = `update apitech_appointments set id_client=$1, id_tecnico=$2, 
     id_service=$3, status =$4, booking_date=$5, booking_hour=$6 
     where id_appointment=$7`;

    await pool.query(sql, [id_client,
        id_tecnico, id_service, status, booking_date, booking_hour, id_appointment]);

    return { id_appointment };
}
async function Excluir(id_appointment) {

    let sql = `delete from apitech_appointments where id_appointment = $1`;

    try {
        const appointment = await pool.query(sql, [id_appointment]);

        return { id_appointment };
    } catch (err) {
        console.log(err);

    }
}
async function ListarServicos(id_tecnico) {

    let sql = `select pts.id_service, s.description, pts.price
    from apitech_tecnicos_services pts
    join apitech_services s on (s.id_service = pts.id_service)
    where pts.id_tecnico = $1
    order by s.description`;
    try {
        const serv = await pool.query(sql, [id_tecnico]);
        return serv.rows;
    } catch (err) {
        console.log(err);
    }
}
export default { ListarAll, Inserir, Excluir, Editar, ListarServicos, ListarId, ListarTecnico, Listar };