import { strict as assert } from 'assert';
import Joi from 'joi';
import { validateUserSchema } from '../src/utils/authValidation';

describe('User Validation Schema', () => {
  it('should validate a correct user object', async () => {
    const user = {
      username: 'john_doe',
      password: 'securePassword123',
    };

    try {
      await validateUserSchema.validateAsync(user);
      assert.ok(true);
    } catch (err) {
      assert.fail('Validation should not fail for a valid user object');
    }
  });

  it('should fail validation for a user with a short username', async () => {
    const user = {
      username: 'jo',
      password: 'securePassword123',
    };

    try {
      await validateUserSchema.validateAsync(user);
      assert.fail('Validation should fail for short username');
    } catch (err) {
      const joiError = err as Joi.ValidationError;
      assert.ok(joiError.details[0].message.includes('"username" length must be at least 3 characters long'));
    }
  });

  it('should fail validation for a user with a short password', async () => {
    const user = {
      username: 'john_doe',
      password: '123',
    };

    try {
      await validateUserSchema.validateAsync(user);
      assert.fail('Validation should fail for short password');
    } catch (err) {
      const joiError = err as Joi.ValidationError;
      assert.ok(joiError.details[0].message.includes('"password" length must be at least 6 characters long'));
    }
  });

  it('should fail validation for a user with a missing password', async () => {
    const user = {
      username: 'john_doe',
    };

    try {
      await validateUserSchema.validateAsync(user);
      assert.fail('Validation should fail for missing password');
    } catch (err) {
      const joiError = err as Joi.ValidationError;
      assert.ok(joiError.details[0].message.includes('"password" is required'));
    }
  });
});
