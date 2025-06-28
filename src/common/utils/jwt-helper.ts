import * as jwt from "jsonwebtoken";

interface TokenResult {
  validToken: boolean;
  data?: {
    data: object;
  };
}
function generateJwtToken(secret: string, data: object, time: string) {
  if (time) return jwt.sign(data, secret, { expiresIn: time });
  return jwt.sign(data, secret);
}

function verifyJwtToken(secret: string, token: string): TokenResult {
  try {
    const data = jwt.verify(token, secret);
    return { validToken: true, data };
  } catch {
    return { validToken: false };
  }
}

export { generateJwtToken, verifyJwtToken };
