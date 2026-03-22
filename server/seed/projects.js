/**
 * Seed script to populate initial projects.
 * Run: node server/seed/projects.js (with MONGODB_URI set)
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';

dotenv.config();

const projects = [
  {
    title: 'Air Quality Index (AQI) Prediction',
    description: 'ML-based prediction using Random Forest regression. Performed data cleaning, feature selection, AQI category mapping (Good, Moderate, etc.), and visualized trends.',
    techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    github: null,
    live: null,
    featured: true,
    order: 0
  },
  {
    title: 'Doctor Appointment System',
    description: 'Full-stack MERN app with role-based dashboards (Patient, Doctor, Admin). RESTful APIs for auth (JWT), booking, and payments. Deployed on Render.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    github: null,
    live: 'https://full-stack-project-1-vau7.onrender.com/',
    featured: true,
    order: 1
  },
  {
    title: 'Portfolio Website',
    description: 'Responsive portfolio with 3D effects, animations, Grid layout, dark/light mode, and mobile-optimized design. Built with MERN stack.',
    techStack: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    github: null,
    live: 'https://my-personal-developer-portfolio-1.onrender.com/',
    featured: true,
    order: 2
  },
  {
    title: 'Swiggy Clone (Live API)',
    description:
      'Food delivery UI inspired by Swiggy with restaurant discovery, menus, and cart flow using live REST APIs for real listings and item data.',
    techStack: ['React.js', 'REST APIs', 'JavaScript', 'CSS3'],
    github: null,
    live: null,
    featured: false,
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
