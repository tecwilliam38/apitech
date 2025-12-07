import clientRepo from "../repositories/clientRepo.js";

import bcrypt from "bcryptjs"
import jwt from "../token.js"


async function InserirClient(client_name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade,endereco_uf, phone_contato, task, client_email, client_password) {
        
    const hashPassword = await bcrypt.hash(client_password, 10);
    const client = await clientRepo.InserirClient(client_name, doc_id, endereco_rua, endereco_bairro,
        endereco_cidade, endereco_uf, phone_contato, task, client_email, hashPassword);
    client.token = jwt.CreateToken(client.id_client);

    return client;
}

async function ProfileClient(id_client) {

    const client = await clientRepo.ProfileClient(id_client);

    return client;
}


async function ListarClient() {

    const client = await clientRepo.ListarClient();

    return client;
}
async function ListarClientId(id_client) {

    const client = await clientRepo.ListarClientId(id_client);

    return client;
}

async function EditarClient(id_client, client_name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, endereco_uf, phone_contato, task, email, password) {

    const client = await clientRepo.EditarClient(id_client, client_name, doc_id, endereco_rua, endereco_bairro,
    endereco_cidade, endereco_uf, phone_contato, task, email, password );

    return client;
}

async function ExcluirClient(id_client) {

    const client = await clientRepo.ExcluirClient(id_client);

    return client;
}
async function BuscarClient(termo) {
    try {
        const resultado = await clientRepo.BuscarClient(termo);
        return resultado;
    } catch (err) {
        console.error(err);
        throw new Error('Erro ao buscar clientes');
    }
}

export default {InserirClient, ProfileClient, ListarClient, ListarClientId, EditarClient, ExcluirClient, BuscarClient}
