interface DatabaseError {
  index: string;
}

export class Errors {
  private error: DatabaseError;

  constructor(error: DatabaseError) {
    this.error = error;
  }

  messageError() {
    switch (this.error.index) {
      case 'Accounts_bankName_fkey':
        return {
          code: 400,
          message: 'Problemas con el nombre del banco ingresado',
        };
      default:
        return {
          code: 400,
          message: 'Problemas de base de datos',
        };
    }
  }
}
