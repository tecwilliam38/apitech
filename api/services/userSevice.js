import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import jwt from '../token.js';
import { UserRepository } from "../repositories/usersRepo.js";

export class UserService {
  constructor() {
    this.userRepo = new UserRepository();
  }

  async register(userData) {
    const existingUser = await this.userRepo.findByEmail(userData.user_email);
    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(userData.user_pass, 10);
    userData.user_pass = hashedPassword;

    const user = await this.userRepo.createUser(userData);

    user.token = jwt.CreateToken(user.id_user);
    
    delete user.user_pass;

    return user;
  }

  async login(email, password) { 
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("Usuário não encontrado");
    
    const isValid = await bcrypt.compare(password, user.user_pass);
    if (!isValid) throw new Error("Senha inválida");
    
   
    // gera token com user_skill incluído
    user.token = jwt.CreateToken(user.id_user, user.user_skill);

    delete user.user_pass;
    return  user;
  }

  async ProfileAdmin(id_user) {
  
      const adminProfile = await this.userRepo.ProfileAdmin(id_user);
  
      return adminProfile;
  }
  async listUsers(requestingUser) {   
    return await this.userRepo.findUsersWithoutAdmin();
  }
}
