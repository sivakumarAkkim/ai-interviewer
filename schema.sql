CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS candidates (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    experience INTEGER DEFAULT 0,
    skills JSONB DEFAULT '[]',
    location TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY,
    candidate_id UUID REFERENCES candidates(id),
    resume_text TEXT NOT NULL,
    parsed_skills JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_descriptions (
    id UUID PRIMARY KEY,
    candidate_id UUID REFERENCES candidates(id),
    jd_text TEXT NOT NULL,
    parsed_requirements JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS match_analysis (
    id UUID PRIMARY KEY,
    resume_id UUID REFERENCES resumes(id),
    jd_id UUID REFERENCES job_descriptions(id),
    match_score INTEGER,
    matched_skills JSONB DEFAULT '[]',
    missing_skills JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS interview_sessions (
    id UUID PRIMARY KEY,
    candidate_id UUID REFERENCES candidates(id),
    jd_id UUID REFERENCES job_descriptions(id),
    current_stage VARCHAR(50) DEFAULT 'HR',
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

CREATE TABLE IF NOT EXISTS interview_questions (
    id UUID PRIMARY KEY,
    session_id UUID REFERENCES interview_sessions(id),
    stage VARCHAR(50),
    question_text TEXT,
    difficulty VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS candidate_responses (
    id UUID PRIMARY KEY,
    question_id UUID REFERENCES interview_questions(id),
    response_text TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evaluations (
    id UUID PRIMARY KEY,
    response_id UUID REFERENCES candidate_responses(id),
    correctness INTEGER,
    relevance INTEGER,
    depth INTEGER,
    communication INTEGER,
    problem_solving INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS adaptive_decisions (
    id UUID PRIMARY KEY,
    evaluation_id UUID REFERENCES evaluations(id),
    action VARCHAR(50),
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS interview_reports (
    id UUID PRIMARY KEY,
    session_id UUID REFERENCES interview_sessions(id),
    technical_score INTEGER,
    communication_score INTEGER,
    strengths JSONB DEFAULT '[]',
    weaknesses JSONB DEFAULT '[]',
    recommendation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);