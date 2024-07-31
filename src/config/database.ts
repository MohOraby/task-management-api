import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function initializeConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default initializeConnection;