import Joi from 'joi';
import { IUser } from '../models/user';

export const validateUserSchema = Joi.object<IUser>({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required()
});