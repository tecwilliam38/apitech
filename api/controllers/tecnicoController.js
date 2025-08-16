import tecnicoService from "../services/tecnicoService.js";


async function InserirTecnico(req, res) {
    const { name, cel_phone, endereco, email, specialty, password } = req.body;

    const tecnicos = await tecnicoService.InserirTecnico(name, cel_phone,
        endereco, email, specialty, password);

    res.status(201).json(tecnicos);
}
async function LoginTecnico(req, res) {

    const { email, password } = req.body;

    const tecnico = await tecnicoService.LoginTecnico(email, password);
    // const tecnico = await tecnicoService.LoginTecnico(email);

    // if (user.length == 0)
    if (!tecnico)
        res.status(401).json({ error: "E-mail ou senha inválida" });
    else
        res.status(200).json(tecnico);
}

async function ListarTecnico(req, res) {

    const name = req.query.name;
    const tecnicos = await tecnicoService.ListarTecnico(name);

    res.status(200).json(tecnicos);
}
async function ListarTecnicoId(req, res) {

    const id_tecnico = req.params.id_tecnico;
    const tecnicos = await tecnicoService.ListarTecnicoId(id_tecnico);

    res.status(200).json(tecnicos);
}

async function EditarTecnico(req, res) {

    const id_tecnico = req.params.id_tecnico;
    const { name, email, endereco, password, cel_phone, } = req.body;

    const tecnico = await tecnicoService.EditarTecnico(id_tecnico, name, email, endereco, password, cel_phone,);

    res.status(200).json(tecnico);
}

async function ExcluirTecnico(req, res) {

    const id_tecnico = req.params.id_tecnico;

    const tecnico = await tecnicoService.ExcluirTecnico(id_tecnico);

    res.status(200).json(tecnico);
}

async function ListarServicosTecnico(req, res) {

    const id_tecnico = req.params.id_tecnico;
    const serv_tecnico = await tecnicoService.ListarTecnicoServicos(id_tecnico);

    res.status(200).json(serv_tecnico);
}

async function TecnicoSkill(req, res) {

    const id_tecnico = req.params.id_tecnico;
    const { id_service, price } = req.body;

    const skills = await tecnicoService.TecnicoSkill(id_tecnico, id_service, price);

    res.status(201).json(skills);
}

export default { 
    InserirTecnico, 
    LoginTecnico, 
    ListarTecnico, 
    ListarTecnicoId, 
    EditarTecnico, 
    ExcluirTecnico, 
    ListarServicosTecnico,
    TecnicoSkill
}