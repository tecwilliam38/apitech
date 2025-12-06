      import pool from "../database/db.js";

//       export async function createUser(user_name,  user_email,user_password,user_celphone,user_adress,
//         user_specialty,is_admin,user_genre) {
//         let sql = `INSERT INTO ans_users 
//             (user_name,user_email, user_password, user_celphone, user_adress, user_specialty, is_admin, 
//           user_genre)
//           VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING user_id`
//         const result = await pool.query(sql,[
//           user_name,user_email, user_password, user_celphone, user_adress, user_specialty, is_admin, 
//           user_genre]
//         );
//         return result.rows[0];
//       }

//   export async function ListarByEmailUser(user_email) {
//   const sql = `SELECT * FROM ans_users WHERE user_email = $1`;
//       try {
//         const user = await pool.query(sql, [user_email]);
//         if (user.length == 0)
//             return [];
//         else
//             return user.rows[0];
//     } catch (err) {
//         console.log(err);
//     }
// }      

//       export async function findUserByEmail(user_email) {
//         const result = await pool.query(
//           `SELECT * FROM ans_users WHERE user_email = $1`,
//           [user_email]
//         );
//         return result.rows[0];
//       }

// export class UserRepository {
//   async create(user_name, user_email, user_password, user_celphone, user_adress, user_specialty, is_admin, user_genre) {
//     const sql = `
//       INSERT INTO ans_users 
//       (user_name, user_email, user_password, user_celphone, user_adress, user_specialty, is_admin, user_genre)
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING user_id, user_name, user_email
//     `;
//     const result = await pool.query(sql, [
//       user_name, user_email, user_password, user_celphone, user_adress, user_specialty, is_admin, user_genre
//     ]);
//     console.log(result.rows[0]);    
//     return result.rows[0];
//   }

//   async findByEmail(user_email) {
//     const sql = `SELECT * FROM ans_users WHERE user_email ILIKE $1`;
//     // const sql = `SELECT * FROM ans_users WHERE user_email = $1`;
//     const result = await pool.query(sql, [user_email]);
//     if (result.rows.length === 0) return null;
//     return result.rows[0];
//   }
// }

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
}
