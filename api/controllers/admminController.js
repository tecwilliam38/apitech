import adminService from "../services/adminService.js";


async function InserirAdmin(req, res) {

    const { name, email, phone_number, password } = req.body;

    const user = await adminService.InserirAdmin(name, email, phone_number, password);

    res.status(201).json(user);
}
async function LoginAdmin(req, res) {

    const { email, password } = req.body;

    const userAdmin = await adminService.LoginAdmin(email, password);

    // if (user.length == 0)
    if (!userAdmin)
        res.status(401).json({ error: "E-mail ou senha inválida" });
    else
        res.status(200).json(userAdmin);
}

    async function ProfileAdmin(req, res) {
    
        const id_admin = req.params.id_admin;
        const adminProfile = await adminService.ProfileAdmin(id_admin);

        res.status(200).json(adminProfile);
    }

// async function ListarAdmin(req, res) {

//     const userAdmin = await serviceAdmin.ListarAdmin();

//     res.status(200).json(userAdmin);
// }

async function EditarAdmin(req, res) {

    const id_user = req.params.id_user;
    const { user_name, user_email, user_contact, user_adress, user_genre, user_skill } = req.body;

    const userAdmin = await adminService.EditarAdmin(id_user, user_name, user_email, user_contact, user_adress, user_genre, user_skill);

    res.status(200).json(userAdmin);
}

// async function ExcluirAdmin(req, res) {

//     const id_admin = req.params.id_admin;

//     const userAdmin = await serviceAdmin.ExcluirAdmin(id_admin);

//     res.status(200).json(userAdmin);
// }

export default {InserirAdmin, LoginAdmin, ProfileAdmin, EditarAdmin}