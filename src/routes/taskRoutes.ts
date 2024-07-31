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

router.post('/create', authMiddleware, createTask);
router.get('/list', authMiddleware, getAllTasks);
router.get('/:taskId/view', authMiddleware, getTaskById);
router.put('/:taskId/update', authMiddleware, updateTask);
router.delete('/:taskId/delete', authMiddleware, deleteTask);
router.get('/search', authMiddleware, searchTasks);
router.get('/filter', authMiddleware, filterTasks);

export default router;