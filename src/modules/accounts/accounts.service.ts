import { Inject, Injectable } from '@nestjs/common';
import { ACCOUNTS_REPOSITORY } from 'src/core/constants';
import { Account } from './accounts.entity';
import { AccountDto } from './dto/accounts.dto';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY)
    private readonly repository_account: typeof Account,
  ) {}

  async create(account: AccountDto): Promise<Account> {
    return await this.repository_account.create(account);
  }

  async findAll(): Promise<Account[]> {
    return await this.repository_account.findAll();
  }

  async findById(id: string): Promise<Account> {
    return await this.repository_account.findOne({
      where: { id },
    });
  }

  async update(id: string, data) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.repository_account.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }
}
