import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {

    return new Promise((resolve, reject) => {
  // Ambil token dari header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    // Jika tidak ada token, kembalikan status 401 (Unauthorized)
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verifikasi token menggunakan secret key
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);

    // Tambahkan informasi user ke dalam request
    req.user = decoded;
    next(); // Lanjut ke handler berikutnya
  } catch (error) {
    // Jika token tidak valid
    return res.status(403).json({ message: 'Invalid token.' });
  }
    });
}