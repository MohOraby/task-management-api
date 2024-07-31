import Joi from 'joi';
import { ITask, TaskPriorityType, TaskStatusType } from '../models/task';

export const validateTaskSchema = Joi.object<ITask>({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('').optional(),
  status: Joi.string().valid(...Object.values(TaskStatusType)).required(),
  priority: Joi.string().valid(...Object.values(TaskPriorityType)).required(),
  dueDate: Joi.date().required(),
  userId: Joi.string().required()
});

export const validateTaskIdParam = Joi.object({
  taskId: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/)
});