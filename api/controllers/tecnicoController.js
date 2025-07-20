

async function InserirTecnico(req, res) {
    const { name, cel_phone, endereco, email, specialty, password } = req.body;

    const tecnicos = await serviceTecnicos.InserirTecnico(name, cel_phone, endereco, email, specialty, password);

    res.status(201).json(tecnicos);
}



export default {InserirTecnico}