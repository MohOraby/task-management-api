import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import { validateUserSchema } from '../utils/authValidation';

export async function register(req: Request, res: Response) {
  const { username, password } = req.body as unknown as IUser;

  await validateUserSchema.validateAsync({
    username,
    password
  });

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  await validateUserSchema.validateAsync({
    username,
    password
  });

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1y'
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}