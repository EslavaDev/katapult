import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { validationOptions } from '../utils/errors';

@Injectable()
export class SchemaValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(initialValue: any, metadata: ArgumentMetadata) {
    const { error, value } = this.schema.validate(
      initialValue,
      validationOptions,
    );
    if (error) {
      const joiError: any = {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error,
      };

      throw new HttpException(joiError, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return value;
  }
}

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        'Ingrese un id de proveedor de tipo number',
      );
    }
    return val;
  }
}
