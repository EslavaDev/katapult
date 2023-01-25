import { Test, TestingModule } from '@nestjs/testing';
import { ACCOUNTS_REPOSITORY, SUPPLIER_REPOSITORY } from 'src/core/constants';
import { Account } from '../accounts/accounts.entity';
import { AccountsService } from '../accounts/accounts.service';
import { Bank } from '../banks/bank.entity';
import { BanksService } from '../banks/banks.service';
import { Supplier } from './supplier.entity';
import { SupplierService } from './supplier.service';
const mockSupplier = {
  create: {
    accountCreate: {
      accountNumber: '214235458d',
      bankName: 'Bancolombia',
      supplierAccount: 3,
    },
    supplierSave: {
      id: 3,
      name: 'Armando Casas',
      nit: '12345678-2',
      contactName: 'Carlos de Francisco',
      contactPhone: null,
    },
  },
  update: {
    updatedPost: {
      id: 1,
      name: 'Armando Casas',
      nit: '12345678-2',
      contactName: 'Carlos de Francisco',
    },
  },
  findAll: [
    {
      id: 1,
      name: 'Armando Casas',
      nit: '12345678-2',
      contactName: 'Carlos de Francisco',
      contactPhone: null,
      accounts: [
        {
          accountNumber: '354235',
          bankName: 'Bancomeva',
          supplierAccount: 1,
        },
      ],
    },
  ],
  findOne: {
    id: 1,
    name: 'Armando Casas',
    nit: '12345678-2',
    contactName: 'Carlos de Francisco',
    contactPhone: null,

    accounts: [
      {
        accountNumber: '354235',
        bankName: 'Bancomeva',
        supplierAccount: 1,
      },
    ],
  },
};

describe('SupplierService', () => {
  let model: typeof Supplier;
  let serviceSupplier: SupplierService;
  let serviceBanks: BanksService;
  let serviceAccounts: AccountsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplierService,
        {
          provide: SUPPLIER_REPOSITORY,
          useValue: {
            findAll: jest.fn(() => mockSupplier.findAll),
            findOne: jest.fn(() => mockSupplier.findOne),
            create: jest.fn(() => mockSupplier.create.supplierSave),
            update: jest.fn(() => mockSupplier.update),
            destroy: jest.fn(),
          },
        },
        {
          provide: AccountsService,
          useValue: {
            findById: jest.fn(() => mockSupplier.findOne.accounts[0]),
            create: jest.fn(() => mockSupplier.create.accountCreate),
            delete: jest.fn(),
          },
        },
        {
          provide: BanksService,
          useValue: {
            findById: jest.fn(() => mockSupplier.create.accountCreate.bankName),
          },
        },
      ],
    }).compile();
    model = module.get<typeof Supplier>(SUPPLIER_REPOSITORY);
    serviceSupplier = module.get<SupplierService>(SupplierService);
    serviceAccounts = module.get<AccountsService>(AccountsService);
    serviceBanks = module.get<BanksService>(BanksService);
  });

  it('should be defined', () => {
    expect(serviceSupplier).toBeDefined();
    expect(serviceBanks).toBeDefined();
    expect(serviceAccounts).toBeDefined();
  });

  describe('SupplierService', () => {
    it('Crear un Supplier', async () => {
      const supplier = {
        name: 'Armando Casas',
        nit: '12345678-1',
        contactName: 'Carlos de Francisco',
        bankName: 'Bancolombia',
        accountId: '214235458',
      };

      jest.spyOn(serviceAccounts, 'findById').mockImplementation(() => null);
      expect(await serviceSupplier.create(supplier)).toEqual(
        mockSupplier.create,
      );
    });

    it('creando un Supplier con un numero de cuenta repetido', async () => {
      const supplier = {
        name: 'Eduardo Diaz',
        nit: '12345678-1',
        contactName: 'Carlos de Francisco',
        bankName: 'Bancolombia',
        accountId: '214235458',
      };

      jest
        .spyOn(serviceAccounts, 'findById')
        .mockResolvedValue(mockSupplier.create.accountCreate as Account);

      expect(await serviceSupplier.create(supplier)).toEqual({
        code: 400,
        message: 'Numero de cuenta ya existe',
      });
    });

    it('creando un supplier con un banco que no existe', async () => {
      const supplier = {
        name: 'Fernando Herrera',
        nit: '123456259-1',
        contactName: 'Carlos de Francisco',
        bankName: 'Colpatria',
        accountId: '214235450',
      };

      jest.spyOn(serviceBanks, 'findById').mockReturnValue(null);

      jest.spyOn(serviceAccounts, 'findById').mockReturnValue(null);

      expect(await serviceSupplier.create(supplier)).toEqual({
        code: 404,
        message: 'No existe el banco',
      });
    });

    it('Buscar todos los provedores', async () => {
      expect(await serviceSupplier.findAll()).toEqual(mockSupplier.findAll);
    });

    it('Buscar un proveedor', async () => {
      const supplierId = 1;

      expect(await serviceSupplier.findById(supplierId)).toEqual(
        mockSupplier.findOne,
      );
    });

    it('Buscar un supplierId que no existe', async () => {
      const supplierId = 25;

      jest.spyOn(model, 'findOne').mockReturnValue(null);

      expect(await serviceSupplier.findById(supplierId)).toEqual(null);
    });

    it('Actualizar un Supplier solo el nombre', async () => {
      const supplierId = 1;
      const supplierUpdate = {
        name: 'Armando Casas',
      };

      jest.spyOn(model, 'update').mockReturnValue([
        1,

        [
          {
            id: 1,
            name: 'Armando Casas',
            nit: '12345678-2',
            contactName: 'Carlos de Francisco',
          },
        ],
      ] as any);

      expect(
        await await serviceSupplier.update(supplierId, supplierUpdate),
      ).toEqual({
        code: 200,
        data: { ...mockSupplier.update },
      });
    });
  });
});
