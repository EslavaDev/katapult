import { DatabaseError } from 'src/utils/errors';

export class Errors {
  private error: DatabaseError;

  constructor(error: DatabaseError) {
    this.error = error;
  }

  messageError() {
    switch (this.error.index || this.error.parent.constraint) {
      case 'Accounts_bankName_fkey':
        return {
          code: 404,
          message: 'Banco No existe',
        };

      case 'Accounts_pkey':
        return {
          code: 400,
          message: 'Numero de cuenta ya existe',
        };
      default:
        return {
          code: 400,
          message: 'Problemas de base de datos',
        };
    }
  }
}
