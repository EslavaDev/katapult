import Joi from 'joi';

export const supplierSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Nombre del proveedor requerido',
  }),
  nit: Joi.string()
    .regex(/\d{8}-\d$/)
    .required()
    .messages({
      'any.required': 'NIT requerido',
      'string.regex': 'Formato de NIT invalido',
    }),
  contactName: Joi.string().required().messages({
    'any.required': 'Nombre de contacto requerido',
  }),
  contactPhone: Joi.string().max(10).optional().messages({
    'string.max': 'El telefono de contacto debe tener maximo 10 digitos',
  }),

  bankName: Joi.string().required().messages({
    'any.required': 'Ingrese nombre del banco ',
  }),
  accountId: Joi.string().max(15).messages({
    'string.max': 'Ingrese maximo 15 caracteres para el numero de cuenta',
  }),
});
