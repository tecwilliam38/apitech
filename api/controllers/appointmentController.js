import appointmentService from "../services/appointmentService.js";

export async function listarAgendamentos(req, res) {
  try {
    const agendamentos = await appointmentService.listarAgendaService(req.query);
    res.status(200).json(agendamentos);
  } catch (error) {
    console.error("Erro no controller listarAgendamentos:", error);
    res.status(400).json({ error: error.message });
  }
}
// export async function listarAgenda(req, res) {
//   try {
//     // Filtros vêm da query string: ?id_tecnico=2&dt_start=2025-11-01&dt_end=2025-11-30
//     const agendamentos = await listarAgendaService(req.query);
//     res.status(200).json(agendamentos);
//   } catch (error) {
//     console.error("Erro no controller listarAgenda:", error);
//     res.status(400).json({ error: error.message });
//   }
// }


export async function listarPorTecnico(req, res) {
  try {
    const { id_tecnico } = req.params; // pega da rota /appointments/tecnico/:id_tecnico
    const agendamentos = await appointmentService.listarPorTecnicoService(id_tecnico);
    res.status(200).json(agendamentos);
  } catch (error) {
    console.error("Erro no controller listarPorTecnico:", error);
    res.status(400).json({ error: error.message });
  }
}


async function ListarId(req, res) {

    const id_appointment = req.params.id_appointment;
    const appointments = await appointmentService.ListarId(id_appointment);

    res.status(200).json(appointments);
}

async function Inserir(req, res) {

    // const id_client = req.id_client;
    const { id_client, id_tecnico, id_service, status,
        booking_date, booking_hour } = req.body;

    const appointment = await appointmentService.Inserir(id_client,
        id_tecnico, id_service, status, booking_date, booking_hour);

    res.status(201).json(appointment);
}

async function Excluir(req, res) {

    const id_appointment = req.params.id_appointment;

    const appointment = await appointmentService.Excluir(id_appointment);

    res.status(201).json(appointment);
}


async function Editar(req, res) {

    const id_appointment = req.params.id_appointment;
    const { id_client, id_tecnico, id_service, status,
        booking_date, booking_hour } = req.body;

    const appointment = await appointmentService.Editar(id_appointment, id_client,
        id_tecnico, id_service, status, booking_date, booking_hour);

    res.status(200).json(appointment);
}

export default {
    Inserir, Excluir, ListarId, Editar, listarAgendamentos, listarPorTecnico
};