import jwt from "../token.js";
import bcrypt from "bcryptjs";
import { createUser, ListarByEmailUser, UserRepository } from "../repositories/usersRepo.js";

export async function registerUser(user_name, user_email, user_password, user_celphone, user_adress,
  user_specialty, is_admin, user_genre) {
  const hashPassword = await bcrypt.hash(user_password, 10);

  const user = await createUser(user_name, user_email, hashPassword,
    user_celphone, user_adress, user_specialty, is_admin, user_genre);
  user.token = jwt.CreateToken(user.user_id);
  return user;
}

export async function loginUser(user_email, user_password) {
  const admin = await ListarByEmailUser(user_email);
    if (!admin)
        return null;
    else {
        if (await bcrypt.compare(user_password, admin.user_password)) {
            delete admin.user_password;
            admin.token = jwt.CreateToken(admin.user_id);
            return admin;
        } else
            return [];
    }
}

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(user_name, user_email, user_password, user_celphone, user_adress, user_specialty, is_admin, user_genre) {
    const hashPassword = await bcrypt.hash(user_password, 10);
    const user = await this.userRepository.create(
      user_name, user_email, hashPassword, user_celphone, user_adress, user_specialty, is_admin, user_genre
    );
    user.token = jwt.CreateToken(user.user_id); // usa sua função existente
    return user;
  }

  async login(user_email, user_password) {
     const user = await this.userRepository.findByEmail(user_email);
  console.log("Usuário encontrado:", user);

  if (!user) return null;

  const isValid = await bcrypt.compare(user_password, user.user_password);
  console.log("Senha válida?", isValid);

  if (!isValid) return null;

  delete user.user_password;
  user.token = jwt.CreateToken(user.user_id);
  return user;
  }
}

