import { Request, Response } from 'express';
import userModel from '../models/userModel';
import bcrypt from 'bcrypt'
import { User } from '../interface/user'
import jwt from 'jsonwebtoken'


export const registerUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      res.status(400).send({ message: 'user with this email already exists' });
      return;
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); 


    const newUser = new userModel({ name, email,password: hashedPassword  });
    await newUser.save();

    res.status(201).send({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error while processing your request!',error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user: User | null = await userModel.findOne({ email });
    
        if (!user) {
          res.status(404).json({ message: 'User data does not exists!' });
          return;
        }
        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
          res.status(401).send({ message: 'Invalid username and password' });
          return;
        }
    
        const payload = {
          email: user.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' }); 
    
        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error while processing your request!',error });
    }
  };
  

