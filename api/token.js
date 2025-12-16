import jwt from "jsonwebtoken";

const secretToken = "jornadaJS123";

// function CreateToken(id_user) {
//     const token = jwt.sign({ id_user }, secretToken, {
//         expiresIn: 9999999
//     });

//     return token;
// }
function CreateToken(user) {
  const token = jwt.sign(
    {
      id_user: user.id_user,      // id do usuário    
      user_skill: user.user_skill // aqui você insere a skill
    },
    secretToken
    // { expiresIn: "9999999" }
  );

  return token;
}

function ValidateToken(req, res, next) {
  const authToken = req.headers.authorization; // "Bearer 000000000"

  if (!authToken)
    return res.status(401).json({ error: "Token não informado" });

  const [bearer, token] = authToken.split(" ");  // "Bearer"   "000000000"

  jwt.verify(token, secretToken, (err, tokenDecoded) => {

    if (err)
      return res.status(401).json({ error: "Token inválido" });

    // req.id_user = tokenDecoded.id_user;
    req.user = {
      id_user: tokenDecoded.id_user,
      user_skill: tokenDecoded.user_skill // ESSENCIAL para validar admin
    };

    next();
  });
}

function VerifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, 'seuSegredoJWT');
    req.id_admin = decoded.id_admin;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token inválido' });
  }
}


export default { CreateToken, ValidateToken, VerifyToken };