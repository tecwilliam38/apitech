import bcrypt from "bcryptjs";
import jwt from "../token.js"
import tecnicoRepo from "../repositories/tecnicoRepo.js";

async function InserirTecnico(name, cel_phone, endereco, email, specialty, password) {
    const hashPassword = await bcrypt.hash(password, 10);
    const tecnicos = await tecnicoRepo.InserirTecnico(name, cel_phone, endereco, email, specialty, hashPassword);
    tecnicos.token = jwt.CreateToken(tecnicos.id_tecnico);

    return tecnicos;
}
async function ListarTecnico(name) {

    const tecnicos = await tecnicoRepo.ListarTecnico(name);

    return tecnicos;
}

async function EditarTecnico(id_tecnico, name, email, endereco, cel_phone, specialty) {

    const tecnicos = await tecnicoRepo.EditarTecnico(id_tecnico, name, email, endereco, cel_phone, specialty, icon);

    return tecnicos;
}
async function LoginTecnico(email, password) {

    const tecnico = await tecnicoRepo.ListarByEmail(email);

    if (!tecnico)
        return null;
    else {
        if (await bcrypt.compare(password, tecnico.password)) {
            delete tecnico.password;

            tecnico.token = jwt.CreateToken(tecnico.id_tecnico);

            return tecnico;
        } else
            return [];
    }
}
// async function Excluir(id_tecnico) {

//     const tecnicos = await repoTecnicos.Excluir(id_tecnico);

//     return tecnicos;
// }

// async function ListarServicos(id_tecnico) {

//     const serv_tecnico = await repoTecnicos.ListarServicos(id_tecnico);

//     return serv_tecnico;
// }

export default {InserirTecnico, LoginTecnico, ListarTecnico, EditarTecnico}