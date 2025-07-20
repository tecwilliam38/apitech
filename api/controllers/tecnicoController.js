

async function InserirTecnico(req, res) {
    const { name, cel_phone, endereco, email, specialty, password } = req.body;

    const tecnicos = await tecnicoServices.InserirTecnico(name, cel_phone,
        endereco, email, specialty, password);

    res.status(201).json(tecnicos);
}


// async function ListarTecnico(req, res) {

//     const name = req.query.name;
//     const tecnicos = await serviceTecnicos.Listar(name);

//     res.status(200).json(tecnicos);
// }

// async function EditarTecnico(req, res) {

//     const id_tecnico = req.params.id_tecnico;
//     const { name, specialty, icon } = req.body;

//     const tecnico = await serviceTecnicos.Editar(id_tecnico, name, specialty, icon);

//     res.status(200).json(tecnico);
// }

// async function ExcluirTecnico(req, res) {

//     const id_tecnico = req.params.id_tecnico;

//     const tecnico = await serviceTecnicos.Excluir(id_tecnico);

//     res.status(200).json(tecnico);
// }

// async function ListarServicosTecnico(req, res) {

//     const id_tecnico = req.params.id_tecnico;
//     const serv_tecnico = await serviceTecnicos.ListarServicos(id_tecnico);

//     res.status(200).json(serv_tecnico);
// }

export default { InserirTecnico }