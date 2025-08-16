import appointmentRepo from "../repositories/appointmentRepo.js";


async function ListarAll(id_client, dt_start, dt_end, id_tecnico) {
    // console.log('ListarAll recebeu:', { id_client, id_tecnico, dt_start, dt_end });

    const appointments = await appointmentRepo.ListarAll(id_client, dt_start, dt_end, id_tecnico);

    return appointments;
}

async function ListarTecnico(id_tecnico) {

    const appointments = await appointmentRepo.ListarTecnico(id_tecnico);

    return appointments;
}

async function ListarId(id_appointment) {

    const appointments = await appointmentRepo.ListarId(id_appointment);

    return appointments;
}

async function Inserir(id_client, id_tecnico, id_service, status, booking_date, booking_hour) {
    const appointment = await appointmentRepo.Inserir(id_client,
        id_tecnico, id_service, status, booking_date, booking_hour);
    return appointment;
}

async function Excluir(id_client, id_appointment) {

    const appointment = await appointmentRepo.Excluir(id_client, id_appointment);

    return appointment;
}

async function Editar(id_appointment, id_client,
    id_tecnico, id_service, status, booking_date, booking_hour) {

    const appointment = await appointmentRepo.Editar(id_appointment, id_client,
        id_tecnico, id_service, status, booking_date, booking_hour);

    return appointment;
}
async function ListarAgenda(id_client, dt_start, dt_end, id_tecnico) {
    const agennda = await appointmentRepo.ListarAgenda(id_client, dt_start, dt_end, id_tecnico);
    return agennda;
}

export default { ListarAll, Inserir, Excluir, ListarId, Editar, ListarTecnico, ListarAgenda }