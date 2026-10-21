/**
 * Seed script to populate initial projects in MongoDB.
 * Run: node server/seed/projects.js (with MONGODB_URI set)
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';

dotenv.config();

const projects = [
  {
    title: 'Rahat: Urban Flood & Heat Early Warning',
    description: 'Heat and flood early warning system for Delhi\'s 290 municipal wards using FastAPI, PostgreSQL, and AWS Bedrock & Rekognition with 35 e2e tests.',
    techStack: ['FastAPI', 'PostgreSQL', 'AWS Bedrock', 'AWS Rekognition', 'AWS S3', 'RDS', 'CloudFront', 'MCP', 'Web Push'],
    github: 'https://github.com/Prm01/Rahat',
    live: 'https://d17rx6mkixl5iz.cloudfront.net/',
    featured: true,
    order: 0
  },
  {
    title: 'BhoomiAI: Land Record Digitization',
    description: 'Automated land record digitization and validation using TrOCR and LangChain agentic verification pipelines with 92% field accuracy, slashing processing from 15 min to under 1 min.',
    techStack: ['TrOCR', 'LangChain', 'Python', 'FastAPI', 'React', 'Computer Vision'],
    github: 'https://github.com/Prm01',
    live: 'https://smart-land-digitization.vercel.app/',
    featured: true,
    order: 1
  },
  {
    title: 'Doctor Appointment System',
    description: 'Full-stack MERN platform with 3 discrete role-based dashboards (Patient/Doctor/Admin), JWT REST APIs, and Lighthouse accessibility elevated from 79 to 100.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/Prm01',
    live: 'https://full-stack-project-1-vau7.onrender.com/',
    featured: true,
    order: 2
  },
  {
    title: 'Finance Dashboard UI',
    description: 'High-performance interactive financial analytics interface with dynamic charting, KPI summaries, and responsive glassmorphism UI achieving 95+ Lighthouse performance.',
    techStack: ['React.js', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    github: 'https://github.com/Prm01',
    live: 'https://finance-dashboard-ui-1.onrender.com/',
    featured: true,
    order: 3
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log('✅ Projects seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
