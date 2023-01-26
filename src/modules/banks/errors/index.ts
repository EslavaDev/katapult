import { DatabaseError } from 'src/utils/errors';

export class Errors {
  private error: DatabaseError;

  constructor(error: DatabaseError) {
    this.error = error;
  }

  messageError() {
    if (this.error.status) {
      return {
        code: this.error.status,
        message: this.error.message,
      };
    }
    const error = this.error.index ?? this.error.name;

    switch (error) {
      case 'SequelizeUniqueConstraintError':
        return {
          code: 400,
          message: 'Nombre de banco ya registrado',
        };

      default:
        return {
          code: 400,
          message: 'Problemas de base de datos',
        };
    }
  }
}
