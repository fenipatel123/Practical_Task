import mongoose, { ConnectOptions } from "mongoose";
import { User } from '../interface/user';
import userModel from '../models/userModel'
import bcrypt from 'bcrypt'
import dotenv from "dotenv";
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });


const adminData: User = {
  name: 'Admin_User',
  email: 'admin@123.com',
  password:'admin@123',
  role: 'Admin',
  createdAt: new Date(),
  updatedAt: new Date()
};

const addAdminUser = async (): Promise<void> => {
  try {
    const options: ConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as ConnectOptions;

    await mongoose.connect(process.env.MONGO_URI!,options);

    console.log('Connected to MongoDB');

    const existingAdmin = await userModel.findOne({ email: adminData.email, role: 'Admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
    } else {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      adminData.password = hashedPassword;
      
      const adminUser = new userModel(adminData);
      await adminUser.save();
      console.log('Admin user added successfully');
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
};

addAdminUser();
