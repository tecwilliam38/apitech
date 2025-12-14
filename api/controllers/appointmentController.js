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
  try {
    const novoAgendamento = await appointmentService.inserirService(req.body);
    res.status(201).json(novoAgendamento);
  } catch (error) {
    console.error("Erro no controller inserir:", error);
    res.status(400).json({ error: error.message });
  }
}


async function Excluir(req, res) {

    const id_appointment = req.params.id_appointment;

    const appointment = await appointmentService.Excluir(id_appointment);

    res.status(201).json(appointment);
}

async function Editar(req, res) {
  try {
    const { id_appointment } = req.params; // rota /appointments/:id
    const agendamentoEditado = await appointmentService.editarService(id_appointment, req.body);
    res.status(200).json(agendamentoEditado);
  } catch (error) {
    console.error("Erro no controller editar:", error);
    res.status(400).json({ error: error.message });
  }
}



export default {
    Inserir, Excluir, ListarId, Editar, listarAgendamentos, listarPorTecnico
};