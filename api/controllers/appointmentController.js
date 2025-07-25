import appointmentService from "../services/appointmentService.js";


async function ListarByUser(req, res) {

    const id_tecnico = req.id_tecnico;
    const appointments = await appointmentService.ListarAll(id_tecnico);

    res.status(200).json(appointments);
}

async function ListarAll(req, res) {

    const dt_start = req.query.dt_start;
    const dt_end = req.query.dt_end;
    const id_tecnico = req.query.id_tecnico;
    
    const appointments = await appointmentService.ListarAll(0, dt_start, dt_end, id_tecnico);

    res.status(200).json(appointments);
}

async function ListarId(req, res) {

    const id_appointment = req.params.id_appointment;
    const appointments = await appointmentService.ListarId(id_appointment);

    res.status(200).json(appointments);
}

async function Inserir(req, res) {

    // const id_client = req.id_client;
    const {id_client, id_tecnico, id_service, status,
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
        id_tecnico, id_service,status, booking_date, booking_hour);

    res.status(200).json(appointment);
}

export default {
    ListarAll, ListarByUser, Inserir, Excluir, ListarId,
    InserirAdmin, EditarAdmin
};