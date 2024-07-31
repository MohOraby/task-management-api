import { Response } from 'express';
import Task, { ITask } from '../models/task';
import { AuthRequest } from '../middlewares/authMiddleware';
import { FilterQuery } from 'mongoose';
import { validateTaskIdParam, validateTaskSchema } from '../utils/taskValidation';

export async function createTask(req: AuthRequest, res: Response) {
  const { title, description, status, priority, dueDate } = req.body as unknown as Omit<ITask, 'userId'>;
  const { userId } = req;

  await validateTaskSchema.validateAsync({
    title,
    description,
    status,
    priority,
    dueDate,
    userId
  });

  try {
    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      userId
    });

    return res.status(201).json({ message: 'Task created', taskId: newTask._id });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}

export async function getAllTasks(req: AuthRequest, res: Response) {
  const { page = 1, limit = 10 } = req.query;
  const { userId } = req;

  try {
    const tasks = await Task.find({ userId, isDeleted: false }) // maybe we could add a `select` function, but I feel all fields are useful in the response
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    return res.status(200).json({ message: 'Tasks fetched', tasks });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}

export async function getTaskById(req: AuthRequest, res: Response) {
  const { taskId } = req.params;
  const { userId } = req;

  await validateTaskIdParam.validateAsync({
    taskId
  });

  try {
    const task = await Task.findOne({ message: 'Task fetched', _id: taskId, userId, isDeleted: false });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({ task });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}

export async function updateTask(req: AuthRequest, res: Response) {
  const { taskId } = req.params;
  const { title, description, status, priority, dueDate } = req.body as unknown as Omit<ITask, 'userId'>;
  const { userId } = req;

  await Promise.all([
    validateTaskSchema.validateAsync({
      title,
      description,
      status,
      priority,
      dueDate,
      userId
    }),
    validateTaskIdParam.validateAsync({
      taskId
    })
  ]);

  try {
    const { matchedCount, modifiedCount } = await Task.updateOne(
      { _id: taskId, userId, isDeleted: false },
      { title, description, status, priority, dueDate }
    );

    if (!matchedCount) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (!modifiedCount) {
      return res.status(400).json({ message: 'Could not update task' });
    }

    return res.json({ message: 'Task updated' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}

export async function deleteTask(req: AuthRequest, res: Response) {
  const { taskId } = req.params;
  const { userId } = req;

  await validateTaskIdParam.validateAsync({
    taskId
  });

  try {
    const { matchedCount, modifiedCount } = await Task.updateOne({ _id: taskId, userId, isDeleted: false }, { isDeleted: true });
    if (!matchedCount) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (!modifiedCount) {
      return res.status(400).json({ message: 'Could not update task' });
    }

    return res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export async function searchTasks(req: AuthRequest, res: Response) {
  const { title } = req.query;
  const { userId } = req;

  try {
    const tasks = await Task.find({
      userId,
      title: { $regex: title, $options: 'i' },
      isDeleted: false
    });

    return res.json({ message: 'Tasks fetched', tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export async function filterTasks(req: AuthRequest, res: Response) {
  const { status, priority } = req.query;
  const { userId } = req;

  try {
    const filter: FilterQuery<ITask> = { userId };
    if (status) {
      filter.status = status;
    }
    if (priority) {
      filter.priority = priority;
    }

    const tasks = await Task.find(filter);

    return res.json({ message: 'Tasks fetched', tasks });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}