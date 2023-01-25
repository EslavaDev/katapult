import { Module } from '@nestjs/common';
import { supplierProvider } from './supplier.providers';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { BanksModule } from '../banks/banks.module';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  providers: [SupplierService, ...supplierProvider],
  controllers: [SupplierController],
  imports: [BanksModule, AccountsModule],
})
export class SupplierModule {}
