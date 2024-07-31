import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: TaskStatusType;
  priority: TaskPriorityType;
  dueDate: Date;
  userId: string | Types.ObjectId;
  isDeleted: boolean;
}

export enum TaskStatusType {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed'
}

export enum TaskPriorityType {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: TaskStatusType, required: true },
  priority: { type: String, enum: TaskPriorityType, required: true },
  dueDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isDeleted: { type: Boolean, default: false, required: true }
});

taskSchema.index({ title: 1 });
taskSchema.index({ userId: 1 });

export default mongoose.model<ITask>('Task', taskSchema);