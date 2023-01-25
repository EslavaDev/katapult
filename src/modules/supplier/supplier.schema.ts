import Joi from 'joi';

export const supplierSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Nombre del proveedor requerido',
    'string.base': 'Debe ser de tipo string',
    'string.empty': 'Nombre del proveedor no puede ser vacio',
  }),
  nit: Joi.string()
    .regex(/\d{8}-\d$/)
    .required()
    .messages({
      'any.required': 'NIT requerido',
      'string.base': 'Debe ser de tipo string',
      'string.pattern.base': 'Formato de NIT invalido',
    }),
  contactName: Joi.string().required().messages({
    'any.required': 'Nombre de contacto requerido',
    'string.base': 'Debe ser de tipo string',
    'string.empty': 'Nombre del contacto no puede ser vacio',
  }),
  contactPhone: Joi.string().max(10).optional().messages({
    'string.max': 'El telefono de contacto debe tener maximo 10 digitos',
    'string.base': 'Debe ser de tipo string',
  }),

  bankName: Joi.string().required().messages({
    'any.required': 'Ingrese nombre del banco ',
    'string.base': 'Debe ser de tipo string',
    'string.empty': 'Nombre del banco no puede ser vacio',
  }),
  accountId: Joi.string().max(15).required().messages({
    'any.required': 'Ingrese un numero de cuenta ',
    'string.max': 'Ingrese maximo 15 caracteres para el numero de cuenta',
    'string.base': 'Debe ser de tipo string',
    'string.empty': 'Numero de cuenta no puede ser vacio',
  }),
});

export const supplierSchemaUpdate = Joi.object({
  name: Joi.string().optional().messages({
    'any.required': 'Nombre del proveedor requerido',
    'string.base': 'Debe ser de tipo string',
    'string.empty': 'Nombre del proveedor no puede ser vacio',
  }),
  nit: Joi.string()
    .regex(/\d{8}-\d$/)
    .optional()
    .messages({
      'any.required': 'NIT requerido',
      'string.base': 'Debe ser de tipo string',
      'string.pattern.base': 'Formato de NIT invalido',
    }),
  contactName: Joi.string().optional().messages({
    'any.required': 'Nombre de contacto requerido',
    'string.base': 'Debe ser de tipo string',
    'string.empty': 'Nombre del contacto no puede ser vacio',
  }),
  contactPhone: Joi.string().max(10).optional().messages({
    'string.max': 'El telefono de contacto debe tener maximo 10 digitos',
    'string.base': 'Debe ser de tipo string',
  }),

  bankName: Joi.string().optional().messages({
    'any.required': 'Ingrese nombre del banco ',
    'string.base': 'Debe ser de tipo string',
    'string.empty': 'Nombre del banco no puede ser vacio',
  }),
  accountId: Joi.string().max(15).optional().messages({
    'any.required': 'Ingrese un numero de cuenta ',
    'string.max': 'Ingrese maximo 15 caracteres para el numero de cuenta',
    'string.base': 'Debe ser de tipo string',
    'string.empty': 'Numero de cuenta no puede ser vacio',
  }),
})
  .min(1)
  .messages({
    'object.min': 'Ingrese almenos un atributo para actualizar',
  });
