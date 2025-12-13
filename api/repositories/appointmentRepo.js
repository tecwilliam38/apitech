import pool from "../database/db.js";

async function ListarAgenda(id_client, dt_start, dt_end, id_user) {
  let filtro = [];
  let index = 1;

  let sql = `
    SELECT 
      pa.id_appointment,
      pa.id_user,
      us.description as service,
      u.user_name as tecnico,
      u.user_skill as specialty,
      u.user_genre as genre,
      pa.booking_date as date,
      pa.booking_hour as hour, 
      c.client_name AS cliente,
      pa.id_service,
      pa.status,
      pa.id_client,
      usv.price as preco
    FROM appointments pa
    JOIN user_skill us ON us.id_service = pa.id_service
    JOIN users u ON u.id_user = pa.id_user
    JOIN client c ON c.id_client = pa.id_client
    LEFT JOIN user_services usv ON usv.id_user = pa.id_user 
                               AND usv.id_service = pa.id_service
    WHERE pa.id_appointment > 0
  `;

  if (id_client) {
    sql += ` AND pa.id_client = $${index}`;
    filtro.push(id_client);
    index++;
  }

  if (dt_start) {
    sql += ` AND pa.booking_date >= $${index}`;
    filtro.push(dt_start);
    index++;
  }

  if (dt_end) {
    sql += ` AND pa.booking_date <= $${index}`;
    filtro.push(dt_end);
    index++;
  }

  if (id_user) {
    sql += ` AND pa.id_user = $${index}`;
    filtro.push(id_user);
    index++;
  }

  sql += " ORDER BY pa.booking_date, pa.booking_hour";

  try {
    const agenda = await pool.query(sql, filtro);
    // console.log("SQL:", sql, "Params:", filtro);
    // console.log("Rows:", agenda.rows);
    return agenda.rows;
  } catch (erro) {
    console.error("Erro ao buscar agendamentos:", erro);
    throw erro;
  }
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

async function Inserir(id_client, id_user, id_service, status, booking_date, booking_hour) {
  const sql = `
    INSERT INTO appointments (id_client, id_user, id_service, status, booking_date, booking_hour, price)
    SELECT $1, $2, $3, $4, $5, $6, usv.price
    FROM user_services usv
    WHERE usv.id_user = $2 AND usv.id_service = $3
    RETURNING id_appointment, price;
  `;
  try {
    const appointment = await pool.query(sql, [
      id_client,
      id_user,
      id_service,
      status,
      booking_date,
      booking_hour
    ]);
    return appointment.rows[0];
  } catch (err) {
    console.error("Erro ao inserir agendamento:", err);
    throw err;
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


export default {    
    Inserir, 
    Excluir, 
    Editar, 
    ListarServicos, 
    ListarId,     
    ListarAgenda };