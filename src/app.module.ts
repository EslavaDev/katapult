import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { BanksModule } from './modules/banks/banks.module';
import { SupplierService } from './modules/supplier/supplier.service';
import { AccountsService } from './modules/accounts/accounts.service';
import { AccountsModule } from './modules/accounts/accounts.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './middleware/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    BanksModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AccountsModule,
    SupplierModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
