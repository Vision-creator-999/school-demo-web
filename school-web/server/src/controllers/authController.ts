import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY_DAYS = 7;

// Helpers to generate tokens
const generateAccessToken = (payload: { userId: number; email: string; role: string; schoolId: number }) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET || 'fallback_access_secret', {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (payload: { userId: number; email: string; role: string; schoolId: number }) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret', {
    expiresIn: `${REFRESH_TOKEN_EXPIRY_DAYS}d`,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // 1. Fetch user and their role name from Database
    const userQuery = `
      SELECT u.id, u.email, u.password_hash, u.is_active, u.school_id, r.name as role
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.email = $1
    `;
    const userResult = await pool.query(userQuery, [email.toLowerCase().trim()]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    // 2. Check if active
    if (!user.is_active) {
      return res.status(403).json({ error: 'Account is deactivated. Contact administrator.' });
    }

    // 3. Match password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 4. Generate Tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role || 'student',
      schoolId: user.school_id,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // 5. Store Refresh Token in DB
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

    await pool.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, refreshToken, expiresAt]
    );

    // 6. Return response
    return res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        schoolId: user.school_id,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    // 1. Verify token signature
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret') as any;

    // 2. Verify token exists in database and is not expired
    const tokenResult = await pool.query(
      'SELECT user_id FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()',
      [token]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(403).json({ error: 'Invalid or expired refresh token' });
    }

    // 3. Generate new access token
    const newPayload = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      schoolId: decoded.schoolId,
    };

    const accessToken = generateAccessToken(newPayload);

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error during token refresh:', error);
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    // Delete token from database
    await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
