import Joi from 'joi';
import { SchemaValidationPipe } from './schemaValidation.pipe';

describe('SchemaValidationPipe', () => {
  it('should be defined', () => {
    expect(new SchemaValidationPipe(Joi.object({}))).toBeDefined();
  });
});
