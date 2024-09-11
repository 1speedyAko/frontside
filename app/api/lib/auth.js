import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function verifyPassword(username, password) {
  // Your logic to verify user credentials
  // This is just an example, replace with actual logic
  const user = { username, password: await bcrypt.hash(password, 12) };
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
}

export function getToken(req) {
  const token = req.headers.authorization?.split(' ')[1];
  return token ? jwt.verify(token, process.env.NEXTAUTH_SECRET) : null;
}
