import { Router } from "express";
import jwt from "./token.js"

const router = Router();

// New Routes
import clientController from "./controllers/clientController.js";
import admminController from "./controllers/admminController.js";
// import controllerTecnico from "./controllers/controllerTecnico.js";
// import controllerAppointment from "./controllers/controllerAppointment.js";
// import controllerClient from "./controllers/controllerClient.js";
// import pool from "./database/pool.index.js";



// Clientes...
router.post("/client/register", clientController.InserirClient);
router.get("/client/profile",jwt.ValidateToken, clientController.ProfileClient);
router.get("/client/listar", jwt.ValidateToken, clientController.ListarClient);
// router.put("/client/:id_client", jwt.ValidateToken, controllerClient.Editar);
// router.post('/client/buscar', jwt.ValidateToken, controllerClient.Buscar );

// Rotas do Admin...
// router.post("/admin/register", admminController.InserirAdmin);
// router.post("/admin/login", admminController.LoginAdmin);
// router.get("/admin/listar", jwt.ValidateToken, controllerAdmin.ListarAdmin);
// router.get("/admin/appointments", jwt.ValidateToken, controllerAppointment.Listar);

// Tecnicos...
// router.get("/tecnicos/listar", jwt.ValidateToken, controllerTecnico.Listar);
// router.post("/tecnicos/register", jwt.ValidateToken, controllerTecnico.Inserir);
// router.get("/tecnicos/:id_tecnico/services", jwt.ValidateToken, controllerTecnico.ListarServicos);

// Appointments
// router.post("/appointments/insert", jwt.ValidateToken, controllerAppointment.Inserir);
// router.get("/appointments/listar", jwt.ValidateToken, controllerAppointment.ListarByUser);
// router.get("/appointments/listar/:id_appointment", jwt.ValidateToken, controllerAppointment.ListarId);
// router.put("/appointments/edit/:id_appointment", jwt.ValidateToken, controllerAppointment.EditarAdmin);
// router.delete("/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.Excluir);

export default router;