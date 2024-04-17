import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
import { User } from '../interface/user';


export const loginAdminUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const adminUser: User | null = await userModel.findOne({ email, role: 'Admin' });

    if (!adminUser) {
      res.status(404).json({ message: 'Admin user data does not exists!' });
      return;
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, adminUser.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid username and password' });
      return;
    }

    // Generate JWT token for admin user
    const payload = {
      email: adminUser.email,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });

    res.status(200).send({ message: 'Admin user login successful', token });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error while processing your request!',error });
  }
};
