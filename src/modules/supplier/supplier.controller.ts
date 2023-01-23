import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UsePipes,
} from '@nestjs/common';
import { SchemaValidationPipe } from '../../pipes/schemaValidation.pipe';
import { SupplierDto } from './dto/supplier.dto';
import { Supplier } from './supplier.entity';
import { supplierSchema } from './supplier.schema';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  async findAll() {
    return await this.supplierService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Supplier> {
    const supplier = await this.supplierService.findById(id);

    if (!supplier) {
      throw new NotFoundException('This supplier doesnt exist');
    }

    return supplier;
  }

  @UsePipes(new SchemaValidationPipe(supplierSchema))
  @Post()
  async create(@Body() supplier: SupplierDto): Promise<Supplier> {
    return await this.supplierService.create(supplier);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body(new SchemaValidationPipe(supplierSchema)) supplier: SupplierDto,
  ): Promise<Supplier> {
    const { numberOfAffectedRows, updatedPost } =
      await this.supplierService.update(id, supplier);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('This supplier doesnt exist');
    }

    return updatedPost;
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
