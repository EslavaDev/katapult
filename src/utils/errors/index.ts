import { ValidationOptions } from 'joi';

export const validationOptions: ValidationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

export interface DatabaseError {
  index: string;
  name: string;
  parent?: any;
  status?: number;
  message?: string;
}
