import { Module } from '@nestjs/common';
import { banksProviders } from './banks.providers';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';
import { Errors } from './errors';

@Module({
  providers: [BanksService, ...banksProviders, Errors],
  controllers: [BanksController],
  exports: [...banksProviders, BanksService],
})
export class BanksModule {}
