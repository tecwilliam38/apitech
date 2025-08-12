import appointmentRepo from "../repositories/appointmentRepo.js";


async function ListarAll(id_tecnico, dt_start, dt_end, id_client) {

    const appointments = await appointmentRepo.Listar(id_tecnico, dt_start, dt_end, id_client,);

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

export default { ListarAll, Inserir, Excluir, ListarId, Editar, ListarTecnico }