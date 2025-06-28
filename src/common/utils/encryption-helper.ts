import * as bcrypt from "bcrypt";

async function generatePasswordHash(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function comparePassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export { generatePasswordHash, comparePassword };
