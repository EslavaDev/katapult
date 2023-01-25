import Joi from 'joi';

export const bankSchema = Joi.object({
  name: Joi.string().required().max(50).messages({
    'any.required': 'Nombre obligatorio',
    'string.max': 'Maximo 50 caracteres',
  }),
});
