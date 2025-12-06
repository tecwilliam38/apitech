
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



// import { loginUser, registerUser, UserService } from "../services/userSevice.js";

// async function InserirAdmin(req, res) {

//   const { name, email, phone_number, password } = req.body;

//   const user = await adminService.InserirAdmin(name, email, phone_number, password);

//   res.status(201).json(user);
// }

// export async function register(req, res) {
//   const { user_name, user_email, user_password, user_celphone, user_adress,
//     user_specialty, is_admin, user_genre } = req.body;
//   const user = await registerUser(user_name, user_email, user_password, user_celphone, user_adress,
//     user_specialty, is_admin, user_genre);
//   res.status(201).json(user);
// }

// export async function login(req, res) {
 
//      const { user_email, user_password } = req.body;
 
//      const user = await loginUser(user_email, user_password);
 
//      // if (user.length == 0)
//      if (!user)
//          res.status(401).json({ error: "E-mail ou senha inválida" });
//      else
//          res.status(200).json(user);
// }

// const userService = new UserService();

// export class UserController {
//   static async register(req, res) {
//     try {
//       const { user_name, user_email, user_password, user_celphone, user_adress, user_specialty, is_admin, user_genre } = req.body;
//       const user = await userService.register(user_name, user_email, user_password, user_celphone, user_adress, user_specialty, is_admin, user_genre);
//       res.status(201).json(user);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Erro ao cadastrar usuário' });
//     }
//   }

//   static async login(req, res) {
//     try {
//       const { user_email, user_password } = req.body;
//       const user = await userService.login(user_email, user_password);
//       if (!user) {
//         return res.status(401).json({ error: 'E-mail ou senha inválida' });
//       }
//       res.status(200).json(user);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Erro ao realizar login' });
//     }
//   }
// }
