-- 1. School tenancy definition
CREATE TABLE IF NOT EXISTS schools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    branch_code VARCHAR(50) UNIQUE NOT NULL,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. RBAC Roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL, -- 'admin', 'teacher', 'student', 'parent', 'accountant'
    permissions TEXT[] DEFAULT '{}' -- array of allowed operations
);

-- 3. Core Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    school_id INT REFERENCES schools(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Classes
CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    school_id INT REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- 'Class 11 (Science - PCM)'
    numeric_value INT NOT NULL
);

-- 5. Sections
CREATE TABLE IF NOT EXISTS sections (
    id SERIAL PRIMARY KEY,
    class_id INT REFERENCES classes(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL, -- 'A', 'B'
    room_number VARCHAR(50)
);

-- 6. Subjects
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    class_id INT REFERENCES classes(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- 'Physics', 'Mathematics'
    subject_code VARCHAR(50) NOT NULL
);

-- 7. Parent Profiles
CREATE TABLE IF NOT EXISTS parent_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    phone_number VARCHAR(15) NOT NULL,
    occupation VARCHAR(100)
);

-- 8. Student Profiles
CREATE TABLE IF NOT EXISTS student_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    roll_number VARCHAR(50) NOT NULL,
    section_id INT REFERENCES sections(id),
    dob DATE NOT NULL,
    aadhaar_number VARCHAR(12) UNIQUE,
    address TEXT
);

-- 9. Parent-Student Relationship
CREATE TABLE IF NOT EXISTS parent_student_relationship (
    parent_id INT REFERENCES parent_profiles(id) ON DELETE CASCADE,
    student_id INT REFERENCES student_profiles(id) ON DELETE CASCADE,
    PRIMARY KEY (parent_id, student_id)
);

-- 10. Teacher Profiles
CREATE TABLE IF NOT EXISTS teacher_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    aadhaar_number VARCHAR(12) UNIQUE,
    salary NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Refresh Tokens
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
