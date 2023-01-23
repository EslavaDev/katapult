import { Inject, Injectable } from '@nestjs/common';
import { SUPPLIER_REPOSITORY } from '../../core/constants';
import { Account } from '../accounts/accounts.entity';
import { AccountsService } from '../accounts/accounts.service';
import { SupplierDto } from './dto/supplier.dto';
import { Supplier } from './supplier.entity';

@Injectable()
export class SupplierService {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly repository_supplier: typeof Supplier,
  ) {}

  async create(supplier: SupplierDto): Promise<Supplier> {
    const supplierSave = await this.repository_supplier.create(supplier);
    if (supplier.accountId) {
      const accountService = new AccountsService(Account);

      const accountCreate = await accountService.create({
        accountNumber: supplier.accountId,
        bankName: supplier.bankName,
        supplierAccount: supplierSave?.id,
      });
    }

    return supplierSave;
  }

  async findAll(): Promise<Supplier[]> {
    return await this.repository_supplier.findAll();
  }

  async findById(id: string): Promise<Supplier> {
    return await this.repository_supplier.findOne({
      where: { id },
    });
  }

  async update(id: number, data) {
    if (data.accountId) {
      const accountService = new AccountsService(Account);

      const accountCreate = await accountService.update(
        {
          ...data.supplier,
        },
        { where: { id: data.accountId } },
      );
    }

    const [numberOfAffectedRows, [updatedPost]] =
      await this.repository_supplier.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }
  async delete(id: string) {
    return await this.repository_supplier.destroy({ where: { id } });
  }
}
