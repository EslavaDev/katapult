import { Module } from '@nestjs/common';
import { supplierProvider } from './supplier.providers';
import { SupplierService } from './supplier.service';

@Module({
  providers: [SupplierService, ...supplierProvider],
})
export class SupplierModule {}
