import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(
      'MongoDB connection failed. Continuing without database.',
      err?.message || err
    );
  }
};
