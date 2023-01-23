import { Inject, Injectable } from '@nestjs/common';
import { SUPPLIER_REPOSITORY } from '../../core/constants';
import { Account } from '../accounts/accounts.entity';
import { AccountsService } from '../accounts/accounts.service';
import { Bank } from '../banks/bank.entity';
import { BanksService } from '../banks/banks.service';
import { SupplierDto } from './dto/supplier.dto';
import { Supplier } from './supplier.entity';

interface SuppierInterface {
  name?: string;
  nit?: string;
  contactName: string;
  contactPhone: string;
  bankName: string;
  accountId: string;
}

@Injectable()
export class SupplierService {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly repository_supplier: typeof Supplier,
  ) {}

  async create(supplier: SupplierDto): Promise<Supplier | any> {
    const banksService = new BanksService(Bank);
    const accountsService = new AccountsService(Account);

    const findAccount = await accountsService.findById(supplier.accountId);
    if (findAccount) {
      return {
        code: 404,
        message: 'Numero de cuenta ya existe',
      };
    }
    const bank = await banksService.findById(supplier.bankName);
    if (!bank) {
      return {
        code: 404,
        message: 'No existe el banco',
      };
    }

    const supplierSave = await this.repository_supplier.create(supplier);
    let resolve;
    if (supplier.bankName) {
      const accountService = new AccountsService(Account);

      const accountCreate = await accountService.create({
        accountNumber: supplier.accountId,
        bankName: supplier.bankName,
        supplierAccount: supplierSave?.id,
      });
      resolve = { accountCreate };
    }

    return { ...resolve, supplierSave };
  }

  async findAll(): Promise<Supplier[]> {
    return await this.repository_supplier.findAll({
      include: Account,
    });
  }

  async findById(id: number): Promise<Supplier> {
    return await this.repository_supplier.findOne({
      where: { id },
      include: Account,
    });
  }

  async update(id: number, data: SuppierInterface) {
    const findSupplier = await this.findById(id);
    let dataSave;
    if (!findSupplier) {
      return {
        code: 404,
        message: 'Proveedor no encontrado',
      };
    }
    const { bankName, accountId, ...rest } = data;
    if (accountId) {
      const accountService = new AccountsService(Account);

      const { updatedPost } = await accountService.update(id, {
        bankName,
        accountNumber: data.accountId,
      });
      dataSave = [updatedPost];
    }

    const [numberOfAffectedRows, [updatedPost]] =
      await this.repository_supplier.update(
        { ...rest },
        { where: { id }, returning: true },
      );

    return { code: 200, data: { ...dataSave, updatedPost } };
  }
  async delete(id: string) {
    return await this.repository_supplier.destroy({ where: { id } });
  }
}
