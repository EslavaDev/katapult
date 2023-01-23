import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ParseIntPipe,
  SchemaValidationPipe,
} from '../../pipes/schemaValidation.pipe';
import { SupplierDto } from './dto/supplier.dto';
import { Errors } from './errors';
import { Supplier } from './supplier.entity';
import { supplierSchema, supplierSchemaUpdate } from './supplier.schema';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  async findAll() {
    const suppliers = await this.supplierService.findAll();
    if (!suppliers.length) {
      throw new NotFoundException('No existen proveedores');
    }

    return suppliers;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Supplier> {
    const supplier = await this.supplierService.findById(id);

    if (!supplier) {
      throw new NotFoundException('No existe el proveedor');
    }

    return supplier;
  }

  @UsePipes(new SchemaValidationPipe(supplierSchema))
  @Post()
  async create(
    @Body() supplier: SupplierDto,
    @Res() res: Response,
  ): Promise<Supplier | any> {
    const create = await this.supplierService.create(supplier);

    if (create.code) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: create.message });
    }
    return res.status(HttpStatus.OK).json(create);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe())
    id: number,
    @Body(new SchemaValidationPipe(supplierSchemaUpdate))
    supplier: SupplierDto | any,
    @Res() res: Response,
  ): Promise<Supplier | any> {
    try {
      const { code, message, data } = await this.supplierService.update(
        id,
        supplier,
      );

      return res.status(code).json({ message, data });
    } catch (error) {
      const errorValidation = new Errors(error);
      const { code, message } = errorValidation.messageError();
      res.status(code).json({ message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.supplierService.delete(id);
    if (deleted === 0) {
      throw new NotFoundException('This supplier doesnt exist');
    }

    return 'Successfully deleted';
  }
}
