import clientService from "../services/clientService.js";


async function InserirClient(req, res) {
    const { client_name, doc_id, endereco_rua, endereco_bairro,
        endereco_cidade, endereco_uf, phone_contato, task, email, password } = req.body;

    const client = await clientService.InserirClient(client_name, doc_id, endereco_rua, endereco_bairro,
        endereco_cidade, endereco_uf, phone_contato, task, email, password);
    res.status(201).json(client);
}
// async function ProfileClient(req, res) {

//     const id_client = req.id_client;
//     const client = await clientService.ProfileClient(id_client);

//     res.status(200).json(client);
// }
// async function ListarClient(req, res) {

//     const client = await clientService.ListarClient();

//     res.status(200).json(client);
// }
// async function EditarClient(req, res) {

//     const id_client = req.params.id_client;
//     const { name, doc_id, endereco_rua, endereco_bairro,
//     endereco_cidade, phone_contato, task, email, password} = req.body;

//     const client = await clientService.Editar(id_client, name, doc_id, endereco_rua, endereco_bairro,
//     endereco_cidade, phone_contato, task, email, password);

//     res.status(200).json(client);
// }

// async function Excluir(req, res) {

//     const id_client = req.params.id_client;

//     const client = await clientService.Excluir(id_client);

//     res.status(200).json(client);
// }
// async function Buscar(req, res) {

//     const { termo } = req.body; 
//     try {
//         const resultado = await clientService.Buscar(termo);
//         res.status(200).json(resultado);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Erro ao buscar clientes');
//     }
// }

// export default { InserirClient, ProfileClient, ListarClient }
export default { InserirClient }