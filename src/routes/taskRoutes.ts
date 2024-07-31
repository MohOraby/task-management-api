import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  searchTasks,
  filterTasks
} from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getAllTasks);
router.get('/:taskId', authMiddleware, getTaskById);
router.put('/:taskId', authMiddleware, updateTask);
router.delete('/:taskId', authMiddleware, deleteTask);
router.get('/search', authMiddleware, searchTasks);
router.get('/filter', authMiddleware, filterTasks);

export default router;