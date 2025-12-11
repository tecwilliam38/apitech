import pool from "../database/db.js";


export class UserRepository {
  async createUser(user) {
    const query = `
      INSERT INTO users 
      (user_name, user_pass, user_adress, user_contact, user_email, user_genre, user_skill, created_at, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,NOW(),NOW())
      RETURNING id_user;
    `;
    const values = [
      user.user_name,
      user.user_pass,
      user.user_adress,
      user.user_contact,
      user.user_email,
      user.user_genre,
      user.user_skill,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );
    return result.rows[0];
  }

  async ProfileAdmin(id_user) {

    let sql = `SELECT 
         ad.id_user AS id, 
         ad.user_name AS nome, 
         ad.user_email AS email, 
         ad.user_contact AS telefone,
         ad.user_adress AS endereco, ad.user_genre AS genero,
         ad.user_skill AS admin
       FROM users AS ad 
       WHERE ad.id_user = $1`;

    const adminProfile = await pool.query(sql, [id_user]);

    return adminProfile.rows[0];
  }
  async findUsersWithoutAdmin() {
    const query = "SELECT * FROM users WHERE user_skill <> $1";
    const values = ["admin"];
    const result = await pool.query(query, values);
    return result.rows;
  }


}
