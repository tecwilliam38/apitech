
import jwt from "../token.js";
import adminRepo from "../repositories/adminRepo.js";
import bcrypt from "bcryptjs";

async function InserirAdmin(name, email, phone_number, password) {

    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await adminRepo.InserirAdmin(name, email, phone_number, hashPassword);

    admin.token = jwt.CreateToken(admin.id_admin);

    return admin;
}

async function LoginAdmin(email, password) {
    const admin = await adminRepo.ListarByEmailAdmin(email);
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

    const adminProfile = await adminRepo.ProfileAdmin(id_admin);

    return adminProfile;
}
// async function ListarAdmin() {

//     const userAdmin = await adminRepo.ListarAdmin();

//     return userAdmin;
// }

// Service
async function EditarAdmin(id_user, user_name, user_email, user_contact, user_adress, user_genre, user_skill) {
    try {
        const userAdmin = await adminRepo.EditarAdmin(
            id_user,
            user_name,
            user_email,
            user_contact,
            user_adress,
            user_genre,
            user_skill
        );
        return userAdmin;
    } catch (error) {
        console.error("Erro no service EditarAdmin:", error.message);
        throw error;
    }
}

// async function ExcluirAdmin(id_admin) {

//     const userAdmin = await adminRepo.ExcluirAdmin(id_admin);

//     return userAdmin;
// }

export default {
    InserirAdmin,
    LoginAdmin,
    ProfileAdmin,
    EditarAdmin
};


