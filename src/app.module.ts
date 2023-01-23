import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { BanksModule } from './modules/banks/banks.module';

@Module({
  imports: [DatabaseModule, BanksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
