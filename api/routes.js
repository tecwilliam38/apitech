import { Router } from "express";
import jwt from "./token.js"

const router = Router();

// New Routes
import clientController from "./controllers/clientController.js";
import admminController from "./controllers/admminController.js";
import tecnicoController from "./controllers/tecnicoController.js";
import appointmentController from "./controllers/appointmentController.js";
import pool from "./database/db.js";

// Clientes status...
router.post("/client/register", clientController.InserirClient);
router.get("/client/profile", jwt.ValidateToken, clientController.ProfileClient);
router.get("/client/listar", jwt.ValidateToken, clientController.ListarClient);
router.get("/client/listar/:id_client", jwt.ValidateToken, clientController.ListarClientId);
router.put("/client/:id_client", jwt.ValidateToken, clientController.EditarClient);
router.delete("/client/delete/:id_client", jwt.ValidateToken, clientController.ExcluirClient);
router.post('/client/buscar', jwt.ValidateToken, clientController.BuscarClient);

// Rotas do Admin...
router.post("/admin/register", admminController.InserirAdmin);
router.post("/admin/login", admminController.LoginAdmin);
// router.get("/admin/listar", jwt.ValidateToken, controllerAdmin.ListarAdmin);
// router.get("/admin/appointments", jwt.ValidateToken, appointmentController.Listar);

// Tecnicos...
router.post("/tecnicos/register", jwt.ValidateToken, tecnicoController.InserirTecnico);
router.post("/tecnicos/login", tecnicoController.LoginTecnico);
router.get("/tecnicos/listar", jwt.ValidateToken, tecnicoController.ListarTecnico);
router.get("/tecnicos/listar/:id_tecnico", jwt.ValidateToken, tecnicoController.ListarTecnicoId);
router.put("/tecnicos/:id_tecnico", jwt.ValidateToken, tecnicoController.EditarTecnico);
router.delete("/tecnicos/:id_tecnico", jwt.ValidateToken, tecnicoController.ExcluirTecnico);
router.get("/tecnicos/:id_tecnico/services", jwt.ValidateToken, tecnicoController.ListarServicosTecnico);
router.post("/tecnicos/skills/:id_tecnico", jwt.ValidateToken, tecnicoController.TecnicoSkill);


// Appointments
router.post("/appointments/insert", jwt.ValidateToken, appointmentController.Inserir);
router.post("/appointments/listar/tecnico", jwt.ValidateToken, appointmentController.ListarTecnico);
router.get("/appointments/listar", jwt.ValidateToken, appointmentController.ListarAll);
router.get("/appointments/listar/:id_appointment", jwt.ValidateToken, appointmentController.ListarId);
router.put("/appointments/edit/:id_appointment", jwt.ValidateToken, appointmentController.EditarAdmin);
router.delete("/appointments/:id_appointment", jwt.ValidateToken, appointmentController.Excluir);

// Alternativa
router.get('/api/listar/:id_tecnico', async (req, res) => {
  const { id_tecnico } = req.params;

  try {
    const result = await pool.query(
      `SELECT a.id_appointment,a.id_tecnico, s.description AS service,          
                b.name AS tecnico, b.specialty,
                a.booking_date, a.booking_hour, pc.client_name AS cliente, bs.price as preco, 
                a.id_service, a.id_client
         FROM apitech_appointments a
         JOIN apitech_services s ON (s.id_service = a.id_service)
         JOIN apitech_tecnicos b ON (b.id_tecnico = a.id_tecnico)
         JOIN apitech_client pc ON (pc.id_client = a.id_client)
         JOIN apitech_tecnicos_services bs ON (bs.id_tecnico = a.id_tecnico AND bs.id_service = a.id_service)
         WHERE a.id_appointment > 0
         AND a.id_tecnico = $1`,

      [id_tecnico]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar técnico');
  }
});




export default router;