import { Module } from '@nestjs/common';
import { banksProviders } from './banks.providers';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';

@Module({
  providers: [BanksService, ...banksProviders],
  controllers: [BanksController],
})
export class BanksModule {}
