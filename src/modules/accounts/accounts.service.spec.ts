import { ACCOUNTS_REPOSITORY } from '../../core/constants/index';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { Account } from './accounts.entity';
import { AccountDto } from './dto/accounts.dto';

const mockAccount = {
  create: {
    bankName: 'Bancolombia',
    accountNumber: '214235451',
    supplierAccount: 1,
  },
  update: {
    bankName: 'Bancolombia',
    accountNumber: '214235452',
    supplierAccount: 1,
  },
  supplierAccount: 1,
  findAll: [{ bankName: 'Bancolombia', accountNumber: '214235451' }],

  findOne: {
    bankName: 'Bancolombia',
    accountNumber: '214235451',
    supplierAccount: 1,
  },
};

describe('AccountsService', () => {
  let serviceAccount: AccountsService;
  let model: typeof Account;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ACCOUNTS_REPOSITORY,
          useValue: {
            findAll: jest.fn(() => mockAccount.findAll),
            findOne: jest.fn(() => mockAccount.findOne),
            create: jest.fn(() => mockAccount.create),
            update: jest.fn(() => mockAccount.update),
          },
        },
        AccountsService,
      ],
    }).compile();

    serviceAccount = module.get<AccountsService>(AccountsService);
    model = module.get<typeof Account>(ACCOUNTS_REPOSITORY);
  });

  it('should be defined', () => {
    expect(serviceAccount).toBeDefined();
    expect(model).toBeDefined();
  });

  describe('AccountService Tests', () => {
    it('creando una cuenta', async () => {
      const account: AccountDto = {
        bankName: 'Bancolombia',
        accountNumber: '214235451',
        supplierAccount: 1,
      };

      expect(await serviceAccount.create(account)).toEqual(mockAccount.create);
    });

    it('creando una cuenta con un numero existente', async () => {
      const account: AccountDto = {
        bankName: 'Bancolombia',
        accountNumber: '214235451',
        supplierAccount: 1,
      };

      jest.spyOn(model, 'create').mockReturnValue({
        parent: { constraint: 'Accounts_pkey' },
      });

      expect(await serviceAccount.create(account)).toEqual({
        parent: { constraint: 'Accounts_pkey' },
      });
    });

    it('creando una cuenta con un banco que no existe', async () => {
      const account: AccountDto = {
        bankName: 'Colpatria',
        accountNumber: '214235451',
        supplierAccount: 1,
      };
      jest
        .spyOn(model, 'create')
        .mockReturnValue({ index: 'Accounts_bankName_fkey' });

      expect(await serviceAccount.create(account)).toEqual({
        index: 'Accounts_bankName_fkey',
      });
    });

    it('lista de cuentas de proveedores', async () => {
      expect((await serviceAccount.findAll()).length).toBeDefined();
    });

    it('buscar una cuenta de proveedor existente', async () => {
      const accountNumber = '214235451';

      expect(await serviceAccount.findById(accountNumber)).toEqual(
        mockAccount.findOne,
      );
    });

    it('buscar una cuenta no existente', async () => {
      const accountNumber = '214235451';
      jest.spyOn(model, 'findOne').mockReturnValue(null);

      expect(await serviceAccount.findById(accountNumber)).toEqual(null);
    });
  });
});
