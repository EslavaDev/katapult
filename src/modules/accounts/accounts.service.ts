import { Inject, Injectable } from '@nestjs/common';
import { ACCOUNTS_REPOSITORY } from '../../core/constants';
import { Bank } from '../banks/bank.entity';
import { BanksService } from '../banks/banks.service';
import { Account } from './accounts.entity';
import { AccountDto } from './dto/accounts.dto';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY)
    private readonly repository_account: typeof Account,
  ) {}

  async create(account: AccountDto): Promise<Account | any> {
    return await this.repository_account.create(account);
  }

  async findAll(): Promise<Account[]> {
    return await this.repository_account.findAll();
  }

  async findById(id: string): Promise<Account> {
    return await this.repository_account.findOne({
      where: { accountNumber: id },
    });
  }

  async update(id: number, data) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.repository_account.update(
        { ...data },
        { where: { supplierAccount: id }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }
}
