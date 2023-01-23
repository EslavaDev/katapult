import { Module } from '@nestjs/common';
import { accountsProviders } from './accounts.providers';
import { AccountsService } from './accounts.service';

@Module({
  providers: [AccountsService, ...accountsProviders],
})
export class AccountsModule {}
