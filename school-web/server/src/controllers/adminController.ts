import { Request, Response } from 'express';
import * as xlsx from 'xlsx';
import pool from '../config/db';

export const importStudents = async (req: Request, res: Response) => {
  // Simulating multipart file upload check
  if (!req.body.fileBuffer) {
    return res.status(400).json({ error: 'No Excel file buffer uploaded' });
  }

  try {
    const buffer = Buffer.from(req.body.fileBuffer, 'base64');
    
    // 1. Read sheet buffer
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // 2. Parse sheet to JSON rows
    const rows = xlsx.utils.sheet_to_json<any>(worksheet);

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Uploaded Excel sheet is empty' });
    }

    const validatedRows: any[] = [];
    const errors: string[] = [];

    // 3. Row validations
    rows.forEach((row, index) => {
      const name = row.FullName || row.name;
      const rollNumber = row.RollNumber || row.roll_number;
      const dob = row.DateOfBirth || row.dob;
      const email = row.Email || row.email;

      if (!name) {
        errors.push(`Row ${index + 1}: Student Name is missing.`);
      } else if (!rollNumber) {
        errors.push(`Row ${index + 1}: Student Roll number is missing.`);
      } else if (!dob) {
        errors.push(`Row ${index + 1}: Date of Birth (DOB) is missing.`);
      } else {
        validatedRows.push({
          name,
          rollNumber,
          dob,
          email: email || `student${rollNumber}@vidyavihar.org`
        });
      }
    });

    if (errors.length > 0 && validatedRows.length === 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    // In a real system, we would insert these rows inside a SQL Transaction:
    // const client = await pool.connect();
    // try {
    //   await client.query('BEGIN');
    //   for (const student of validatedRows) {
    //      // Insert User credentials -> Insert Student Profile linked via user_id
    //   }
    //   await client.query('COMMIT');
    // } catch (e) {
    //   await client.query('ROLLBACK');
    // }

    return res.status(200).json({
      message: 'Excel parsed and validated successfully',
      totalRows: rows.length,
      importedCount: validatedRows.length,
      preview: validatedRows.slice(0, 5), // return top 5 rows as a preview
      warnings: errors
    });
  } catch (error) {
    console.error('Error importing Excel:', error);
    return res.status(500).json({ error: 'Failed to process Excel spreadsheet' });
  }
};

export const importTeachers = async (req: Request, res: Response) => {
  if (!req.body.fileBuffer) {
    return res.status(400).json({ error: 'No Excel file buffer uploaded' });
  }

  try {
    const buffer = Buffer.from(req.body.fileBuffer, 'base64');
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json<any>(worksheet);

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Uploaded Excel sheet is empty' });
    }

    const validatedRows: any[] = [];
    const errors: string[] = [];

    rows.forEach((row, index) => {
      const name = row.FullName || row.name;
      const employeeId = row.EmployeeID || row.employee_id;
      const email = row.Email || row.email;
      const subject = row.Subject || row.subject;

      if (!name) {
        errors.push(`Row ${index + 1}: Teacher Name is missing.`);
      } else if (!employeeId) {
        errors.push(`Row ${index + 1}: Employee ID is missing.`);
      } else {
        validatedRows.push({
          name,
          employeeId,
          email: email || `teacher_${employeeId}@vidyavihar.org`,
          subject: subject || 'General'
        });
      }
    });

    if (errors.length > 0 && validatedRows.length === 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    return res.status(200).json({
      message: 'Excel parsed and validated successfully',
      totalRows: rows.length,
      importedCount: validatedRows.length,
      preview: validatedRows.slice(0, 5),
      warnings: errors
    });
  } catch (error) {
    console.error('Error importing staff Excel:', error);
    return res.status(500).json({ error: 'Failed to process Excel spreadsheet' });
  }
};
