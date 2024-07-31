import { strict as assert } from 'assert';
import Joi from 'joi';
import { validateTaskSchema, validateTaskIdParam } from '../src/utils/taskValidation';
import { TaskPriorityType, TaskStatusType } from '../src/models/task';

describe('Task Validation Schema', () => {
  it('should validate a correct task object', async () => {
    const task = {
      title: 'Complete project',
      description: 'Finish the task management API',
      status: TaskStatusType.PENDING,
      priority: TaskPriorityType.HIGH,
      dueDate: new Date(),
      userId: '60d21b4667d0d8992e610c85',
    };

    try {
      await validateTaskSchema.validateAsync(task);
      assert.ok(true); 
    } catch (err) {
      assert.fail('Validation should not fail for a valid task object');
    }
  });

  it('should fail validation for an invalid status', async () => {
    const task = {
      title: 'Complete project',
      description: 'Finish the task management API',
      status: 'unknown',
      priority: TaskPriorityType.HIGH,
      dueDate: new Date(),
      userId: '60d21b4667d0d8992e610c85',
    };

    try {
      await validateTaskSchema.validateAsync(task);
      assert.fail('Validation should fail for invalid status');
    } catch (err) {
      const joiError = err as Joi.ValidationError;
      assert.ok(joiError.details[0].message.includes('"status" must be one of'));
    }
  });

  it('should fail validation for a missing due date', async () => {
    const task = {
      title: 'Complete project',
      description: 'Finish the task management API',
      status: TaskStatusType.PENDING,
      priority: TaskPriorityType.HIGH,
      userId: '60d21b4667d0d8992e610c85',
    };

    try {
      await validateTaskSchema.validateAsync(task);
      assert.fail('Validation should fail for missing due date');
    } catch (err) {
      const joiError = err as Joi.ValidationError;
      assert.ok(joiError.details[0].message.includes('"dueDate" is required'));
    }
  });
});

describe('Task ID Validation', () => {
  it('should validate a correct task ID', async () => {
    const params = { taskId: '60d21b4667d0d8992e610c85' };

    try {
      await validateTaskIdParam.validateAsync(params);
      assert.ok(true);
    } catch (err) {
      assert.fail('Validation should not fail for a valid task ID');
    }
  });

  it('should fail validation for an incorrect task ID format', async () => {
    const params = { taskId: 'invalid-task-id' };

    try {
      await validateTaskIdParam.validateAsync(params);
      assert.fail('Validation should fail for an invalid task ID format');
    } catch (err) {
      const joiError = err as Joi.ValidationError;
      assert.ok(joiError.details[0].message.includes('fails to match the required pattern'));
    }
  });

  it('should fail validation for a missing task ID', async () => {
    const params = {};

    try {
      await validateTaskIdParam.validateAsync(params);
      assert.fail('Validation should fail for missing task ID');
    } catch (err) {
      const joiError = err as Joi.ValidationError;
      assert.ok(joiError.details[0].message.includes('"taskId" is required'));
    }
  });
});
