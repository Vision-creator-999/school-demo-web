import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { login, refreshToken, logout } from './controllers/authController';
import { authenticateToken, authorizeRoles } from './middleware/authMiddleware';
import { importStudents, importTeachers } from './controllers/adminController';
import { submitAttendance, getAttendanceHistory } from './controllers/teacherController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup matching frontend origins
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Public Auth Endpoints
app.post('/api/auth/login', login);
app.post('/api/auth/refresh', refreshToken);
app.post('/api/auth/logout', logout);

// Protected Auth Verification Endpoint
app.get('/api/auth/me', authenticateToken, (req, res) => {
  return res.status(200).json({ message: 'Token verified successfully', user: req.user });
});

// Admin Intake Spreadsheet Imports (RBAC Admin-only)
app.post('/api/admin/import/students', authenticateToken, authorizeRoles(['admin']), importStudents);
app.post('/api/admin/import/teachers', authenticateToken, authorizeRoles(['admin']), importTeachers);

// Teacher Portal Attendance Management (RBAC Teacher-only)
app.post('/api/teacher/attendance', authenticateToken, authorizeRoles(['teacher']), submitAttendance);
app.get('/api/teacher/attendance/:sectionId', authenticateToken, authorizeRoles(['teacher']), getAttendanceHistory);

// Protected Admin-only Panel Endpoint (RBAC verify)
app.get('/api/admin/dashboard', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  return res.status(200).json({ message: 'Welcome Admin. Privileged access granted.' });
});

// Bootstrap listener
app.listen(PORT, () => {
  console.log(`⚡ [server]: Server is running at http://localhost:${PORT}`);
});
