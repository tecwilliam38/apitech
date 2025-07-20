
import bcrypt from "bcrypt";
import jwt from "../token.js";

async function InserirAdmin(name, email, phone_number, password) {

    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await repoAdmin.InserirAdmin(name, email, phone_number, hashPassword);

    admin.token = jwt.CreateToken(admin.id_admin);

    return admin;
}
async function LoginAdmin(email, password) {

    const admin = await repoAdmin.ListarByEmailAdmin(email);

    if (!admin)
        return null;
    else {
        if (await bcrypt.compare(password, admin.password)) {
            delete admin.password;

            admin.token = jwt.CreateToken(admin.id_admin);

            return admin;
        } else
            return [];
    }
}
async function ProfileAdmin(id_admin) {

    const admin = await repoUser.ProfileAdmin(id_admin);

    return admin;
}

async function ListarAdmin() {

    const userAdmin = await repoAdmin.ListarAdmin();

    return userAdmin;
}

async function EditarAdmin(id_admin, name, email, phone_number) {

    const userAdmin = await repoAdmin.EditarAdmin(id_admin, name, email, phone_number);

    return userAdmin;
}

async function ExcluirAdmin(id_admin) {

    const userAdmin = await repoAdmin.ExcluirAdmin(id_admin);

    return userAdmin;
}

export default{InserirAdmin, LoginAdmin, ProfileAdmin, ListarAdmin, EditarAdmin, ExcluirAdmin};


