import appointmentRepo from "../repositories/appointmentRepo.js";

async function listarAgendaService(query) {
  const { id_client, dt_start, dt_end, id_tecnico } = query;

  // Validação simples
  if (dt_start && dt_end && new Date(dt_start) > new Date(dt_end)) {
    throw new Error("Data inicial não pode ser maior que a final");
}

return appointmentRepo.ListarAgenda(id_client, dt_start, dt_end, id_tecnico);
}

async function listarPorTecnicoService(id_tecnico) {
  if (!id_tecnico) {
    throw new Error("O parâmetro id_tecnico é obrigatório");
  }

  // Chama o repository com filtro apenas pelo técnico
  return appointmentRepo.ListarAgenda(null, null, null, id_tecnico);
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


export default { Inserir, Excluir, ListarId, Editar, listarAgendaService, listarPorTecnicoService };