import { Inject, Injectable } from '@nestjs/common';
import { SUPPLIER_REPOSITORY } from 'src/core/constants';
import { Account } from '../accounts/accounts.entity';
import { AccountsService } from '../accounts/accounts.service';
import { Bank } from '../banks/bank.entity';
import { BanksService } from '../banks/banks.service';
import { SupplierDto } from './dto/supplier.dto';
import { Supplier } from './supplier.entity';

interface SuppierInterface {
  name?: string;
  nit?: string;
  contactName?: string;
  contactPhone?: string;
  bankName?: string;
  accountId?: string;
}

@Injectable()
export class SupplierService {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly repository_supplier: typeof Supplier,
    private readonly accountsService: AccountsService,
    private readonly banksService: BanksService,
  ) {}

  async create(supplier: SupplierDto): Promise<Supplier | any> {
    const findAccount = await this.accountsService.findById(supplier.accountId);
    if (findAccount) {
      return {
        code: 400,
        message: 'Numero de cuenta ya existe',
      };
    }
    const bank = await this.banksService.findById(supplier.bankName);
    if (!bank) {
      return {
        code: 404,
        message: 'No existe el banco',
      };
    }

    const supplierSave = await this.repository_supplier.create(supplier);
    let resolve;
    if (supplier.bankName) {
      const accountCreate = await this.accountsService.create({
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
      const { updatedPost } = await this.accountsService.update(id, {
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
  async delete(id: number) {
    const findSupplier = await this.repository_supplier.findOne({
      where: { id },
      include: [Account],
    });
    if (findSupplier) {
      if (findSupplier.accounts.length > 0) {
        const array = await Promise.all(
          findSupplier.accounts.map(async (e) => {
            await this.accountsService.delete(e.supplierAccount);
          }),
        );
        return array;
      }

      return await findSupplier.destroy();
    }
    return 0;
  }
}
