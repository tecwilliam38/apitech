import clientRepo from "../repositories/clientRepo.js";
import bcrypt from "bcrypt"
import jwt from "../token.js"


async function InserirClient(client_name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade,endereco_uf, phone_contato, task, email, password) {

    const hashPassword = await bcrypt.hash(password, 10);
    const client = await clientRepo.InserirClient(client_name, doc_id, endereco_rua, endereco_bairro,
        endereco_cidade, endereco_uf, phone_contato, task, email, hashPassword);

    client.token = jwt.CreateToken(client.id_client);

    return client;
}

async function ProfileClient(id_client) {

    const client = await repoClient.ProfileClient(id_client);

    return client;
}


// async function Listar() {

//     const client = await repoClient.Listar();

//     return client;
// }

// async function Editar(id_client, name, email, phone_number) {

//     const client = await repoClient.Editar(id_client, name, email, phone_number);

//     return client;
// }

// async function Excluir(id_client) {

//     const client = await repoClient.Excluir(id_client);

//     return client;
// }
// async function Buscar(termo) {
//     try {
//         const resultado = await repoClient.Buscar(termo);
//         return resultado;
//     } catch (err) {
//         console.error(err);
//         throw new Error('Erro ao buscar clientes');
//     }
// }

export default {InserirClient, ProfileClient}