import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { BanksModule } from './modules/banks/banks.module';
import { BanksService } from './modules/banks/banks.service';
import { SupplierService } from './modules/supplier/supplier.service';
import { AccountsService } from './modules/accounts/accounts.service';
import { AccountsModule } from './modules/accounts/accounts.module';
import { SupplierModule } from './modules/supplier/supplier.module';

@Module({
  imports: [
    DatabaseModule,
    BanksModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AccountsModule,
    SupplierModule,
  ],
  controllers: [AppController],
  providers: [AppService, BanksService, SupplierService, AccountsService],
})
export class AppModule {}
