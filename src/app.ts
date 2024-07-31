import express from 'express';
import initializeConnection from './config/database';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line unicorn/prefer-top-level-await
initializeConnection().catch(err => {
  console.log(err);
});

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;