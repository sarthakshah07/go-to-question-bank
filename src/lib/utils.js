import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt from 'jsonwebtoken'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
}

// Function to verify a JWT token
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}


