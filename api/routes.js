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
// router.post("/agenda/listar", jwt.ValidateToken, appointmentController.ListarAll);
router.get("/appointments/listar/:id_appointment", jwt.ValidateToken, appointmentController.ListarId);
router.put("/appointments/edit/:id_appointment", jwt.ValidateToken, appointmentController.EditarAdmin);
router.delete("/appointments/:id_appointment", jwt.ValidateToken, appointmentController.Excluir);


// Rota alternativa
// POST com body
router.post('/tecnicos/listar', jwt.ValidateToken, async (req, res) => {
    const { id_client, dt_start, dt_end, id_tecnico } = req.body;
    let filtro = [];

    let index = 1;

    let sql = `SELECT pa.id_appointment, pa.id_tecnico, ps.description AS service, 
    pt.name AS tecnico, pt.specialty, pa.booking_date, pa.booking_hour, 
    pts.price AS preco, pc.client_name AS cliente,
    pa.id_service, pa.status, pa.id_client
    FROM apitech_appointments pa
    JOIN apitech_services ps ON ps.id_service = pa.id_service
    JOIN apitech_tecnicos pt ON pt.id_tecnico = pa.id_tecnico
    JOIN apitech_client pc ON pc.id_client = pa.id_client
    JOIN apitech_tecnicos_services pts ON pts.id_tecnico = pa.id_tecnico 
                                       AND pts.id_service = pa.id_service
    WHERE pa.id_appointment > 0`
    if (id_client) {
        filtro.push(id_client);
        // sql += ` AND pa.id_client = $${filtro.length}`;
        sql += ` AND pa.id_client = $${index++}`;
    }

    if (dt_start) {
        filtro.push(dt_start);
        sql += ` AND pa.booking_date >= $${index++}`;
    }

    if (dt_end) {
        filtro.push(dt_end);
        sql += ` AND pa.booking_date <= $${index++}`;
    }

    if (id_tecnico) {
        filtro.push(id_tecnico);
        sql += ` AND pa.id_tecnico = $${index++}`;
    }


    sql += " ORDER BY pa.booking_date, pa.booking_hour";

    try {
        const result = await pool.query(sql, filtro);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});




export default router;