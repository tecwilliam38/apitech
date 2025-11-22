import appointmentService from "../services/appointmentService.js";

async function ListarAgenda(req, res) {
    const id_tecnico = req.user.id_user;
    try {
        const servicos = await appointmentService.ListarAgenda(id_tecnico);
        res.status(200).json(servicos);
    } catch (error) {
        console.error('Erro ao listar serviços:', error);
        res.status(500).json({ error: 'Erro ao listar serviços' });
    }
}

// controllers/appointmentController.js
async function ListarAll(req, res) {
  try {
    const { dt_start, dt_end } = req.query; // filtros opcionais
    const id_tecnico = parseInt(req.params.id_tecnico, 10); // pega do path param

    if (isNaN(id_tecnico)) {
      return res.status(400).json({ error: "id_tecnico inválido" });
    }

    const appointments = await appointmentService.ListarAll(
      0, dt_start, dt_end, id_tecnico
    );

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error);
    res.status(500).json({ error: error.message });
  }
}

async function ListarAlll(req, res) {
    try {
        const { id_tecnico } = req.params;   // pega do path param
        const { dt_start, dt_end } = req.query; // datas podem vir como query string

        const appointments = await appointmentService.ListarAll(
            0, dt_start, dt_end, id_tecnico
        );

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
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


async function InserirAdmin(req, res) {

    const { id_client, id_tecnico, id_service,
        booking_date, booking_hour } = req.body;

    const appointment = await appointmentService.Inserir(id_client,
        id_tecnico, id_service, booking_date, booking_hour);

    res.status(201).json(appointment);
}

async function EditarAdmin(req, res) {

    const id_appointment = req.params.id_appointment;
    const { id_client, id_tecnico, id_service, status,
        booking_date, booking_hour } = req.body;

    const appointment = await appointmentService.Editar(id_appointment, id_client,
        id_tecnico, id_service, status, booking_date, booking_hour);

    res.status(200).json(appointment);
}

export default {
    ListarAll, Inserir, Excluir, ListarId,
    InserirAdmin, EditarAdmin, ListarAgenda
};