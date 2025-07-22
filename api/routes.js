import { Router } from "express";
import jwt from "./token.js"

const router = Router();

// New Routes
import clientController from "./controllers/clientController.js";
import admminController from "./controllers/admminController.js";
import tecnicoController from "./controllers/tecnicoController.js";
import appointmentController from "./controllers/appointmentController.js";

// Clientes...
router.post("/client/register", clientController.InserirClient);
router.get("/client/profile",jwt.ValidateToken, clientController.ProfileClient);
router.get("/client/listar", jwt.ValidateToken, clientController.ListarClient);
router.put("/client/:id_client", jwt.ValidateToken, clientController.EditarClient);
router.post('/client/buscar', jwt.ValidateToken, clientController.BuscarClient );

// Rotas do Admin...
router.post("/admin/register", admminController.InserirAdmin);
router.post("/admin/login", admminController.LoginAdmin);
// router.get("/admin/listar", jwt.ValidateToken, controllerAdmin.ListarAdmin);
// router.get("/admin/appointments", jwt.ValidateToken, appointmentController.Listar);

// Tecnicos...
router.post("/tecnicos/register", jwt.ValidateToken, tecnicoController.InserirTecnico);
router.post("/tecnicos/login", tecnicoController.LoginTecnico);
router.get("/tecnicos/listar", jwt.ValidateToken, tecnicoController.ListarTecnico);
router.put("/tecnicos/:id_tecnico", jwt.ValidateToken, tecnicoController.EditarTecnico);
router.get("/tecnicos/:id_tecnico/services", jwt.ValidateToken, tecnicoController.ListarServicosTecnico);


// Appointments
router.post("/appointments/insert", jwt.ValidateToken, appointmentController.Inserir);
router.get("/appointments/listar/tecnico/:id_tecnico", jwt.ValidateToken, appointmentController.ListarByUser);
router.get("/appointments/listar", jwt.ValidateToken, appointmentController.ListarAll);
router.get("/appointments/listar/:id_appointment", jwt.ValidateToken, appointmentController.ListarId);
router.put("/appointments/edit/:id_appointment", jwt.ValidateToken, appointmentController.EditarAdmin);
router.delete("/appointments/:id_appointment", jwt.ValidateToken, appointmentController.Excluir);

export default router;