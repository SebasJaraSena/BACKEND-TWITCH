import jwt from "jsonwebtoken";
export const generarToken = (uid) => {
  try {
    const expiresIn = 60 * 15; //tiempo de expiracion del token
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn }); //trae el token.env y se envia su expiracion
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });
    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: !(process.env.Modo === "developer"),
      expires: newDate(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};
export const errorsValidate = (error) => {
  switch (error) {
    case "invalid signature":
      return "firma no valida";
    case "jwt expired":
      return "token no valido";
    case "invalid token":
      return "no invente token";
    default:
      return error;
  }
};
