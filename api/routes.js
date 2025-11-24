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
router.get("/admin/profile/:id_admin", admminController.ProfileAdmin);
// router.get("/admin/profile/:id_admin",jwt.VerifyToken, admminController.ProfileAdmin);

// Tecnicos...
router.post("/tecnicos/register", jwt.ValidateToken, tecnicoController.InserirTecnico);
router.post("/tecnicos/login", tecnicoController.LoginTecnico);
router.get("/tecnicos/listar", jwt.ValidateToken, tecnicoController.ListarTecnico);
router.get("/tecnicos/listar/:id_tecnico", jwt.ValidateToken, tecnicoController.ListarTecnicoId);
router.put("/tecnicos/:id_tecnico", jwt.ValidateToken, tecnicoController.EditarTecnico);
router.delete("/tecnicos/:id_tecnico", jwt.ValidateToken, tecnicoController.ExcluirTecnico);
router.get("/tecnicos/services/:id_tecnico", jwt.ValidateToken, tecnicoController.ListarServicosTecnico);
router.post("/tecnicos/skills/:id_tecnico", jwt.ValidateToken, tecnicoController.TecnicoSkill);


// Appointments
router.get("/appointments/listar",jwt.ValidateToken, appointmentController.listarAgendamentos);
router.get("/appointments/tecnico/:id_tecnico", jwt.ValidateToken, appointmentController.listarPorTecnico);
router.get("/appointments/listar/:id_appointment", jwt.ValidateToken, appointmentController.ListarId);
router.put("/appointments/edit/:id_appointment", jwt.ValidateToken, appointmentController.Editar);
router.post("/appointments/insert", jwt.ValidateToken, appointmentController.Inserir);
router.delete("/appointments/:id_appointment", jwt.ValidateToken, appointmentController.Excluir);

export default router;