import { Module } from '@nestjs/common';
import { supplierProvider } from './supplier.providers';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';

@Module({
  providers: [SupplierService, ...supplierProvider],
  controllers: [SupplierController],
})
export class SupplierModule {}
