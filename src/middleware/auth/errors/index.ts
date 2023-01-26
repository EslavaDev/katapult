import { Injectable } from '@nestjs/common';
import { DatabaseError } from 'src/utils/errors';

export class Errors {
  private error: DatabaseError;

  constructor(error: DatabaseError) {
    this.error = error;
  }

  messageError() {
    const error = this.error.index ?? this.error.parent.constraint;

    switch (error) {
      case 'Users_pkey':
        return {
          code: 400,
          message: 'Correo ya existente',
        };

      default:
        return {
          code: 400,
          message: 'Problemas de base de datos',
        };
    }
  }
}
