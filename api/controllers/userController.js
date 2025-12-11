
// controller/userController.js
import { UserService } from "../services/userSevice.js";

const userService = new UserService();

export async function register(req, res) {
  try {
    const userData = req.body;
    const result = await userService.register(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req, res) {
  console.log("Body recebido:", req.body);
  try {
    const { email, password } = req.body; // pega do body
    const result = await userService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function ProfileAdmin(req, res) {
   
    const id_user = req.params.id_user;
    const adminProfile = await userService.ProfileAdmin(id_user);

    res.status(200).json(adminProfile);
}

// export async function listar(req, res) {
//     try {
//       const requestingUser = req.user; // vem do middleware de autenticação
//       const users = await userService.listUsers(requestingUser);
//       return res.json(users);
//     } catch (error) {
//       return res.status(403).json({ error: error.message });
//     }
//   }
export async function listar(req, res) {
  try {
    const users = await userService.listUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar usuários." });
  }
}
