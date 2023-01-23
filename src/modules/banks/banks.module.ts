import { Module } from '@nestjs/common';
import { banksProviders } from './banks.providers';
import { BanksService } from './banks.service';

@Module({
  providers: [BanksService, ...banksProviders],
})
export class BanksModule {}
