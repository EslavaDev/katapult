import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';

const mockSupplier = {
  create: {
    accountCreate: {
      accountNumber: '15456484',
      bankName: 'Bancomeva',
      supplierAccount: 3,
    },
    supplierSave: {
      id: 3,
      name: 'Carlos Eduardo',
      nit: '22001584-1',
      contactName: 'Carlos de Francisco',
      contactPhone: '4485216',
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

describe('SupplierController', () => {
  let controllerSupplier: SupplierController;
  let serviceSupplier: SupplierService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierController],
      providers: [
        {
          provide: SupplierService,
          useValue: {
            findById: jest.fn(() => mockSupplier.findOne.accounts[0]),
            create: jest.fn(() => mockSupplier.create),
            update: jest.fn(() => mockSupplier.update),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controllerSupplier = module.get<SupplierController>(SupplierController);
    serviceSupplier = module.get<SupplierService>(SupplierService);
  });

  it('should be defined', () => {
    expect(controllerSupplier).toBeDefined();
    expect(serviceSupplier).toBeDefined();
  });

  describe('SupplierController', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    it('crear Supplier', async () => {
      const supplier = {
        accountNumber: '15456484',
        bankName: 'Bancomeva',
        supplierAccount: 3,
        name: 'Carlos Eduardo',
        nit: '22001584-1',
        contactName: 'Carlos de Francisco',
        contactPhone: '4485216',
      };

      await controllerSupplier.create(supplier, res as any);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockSupplier.create);
    });

    it('crear un supplier con un banco que no existe', async () => {
      const supplier = {
        accountNumber: '15456484',
        bankName: 'Caja Social',
        supplierAccount: 3,
        name: 'Carlos Eduardo',
        nit: '22001584-1',
        contactName: 'Carlos de Francisco',
        contactPhone: '4485216',
      };

      jest.spyOn(serviceSupplier, 'create').mockReturnValue({
        code: 404,
        message: 'No existe el banco',
      } as any);
      await controllerSupplier.create(supplier, res as any);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        code: 404,
        message: 'No existe el banco',
      });
    });
    it('Actualizar un supplier con un banco que no existe', async () => {
      const supplierId = 1;
      const supplier = {
        bankName: 'Cafe Salud',
      };

      jest.spyOn(serviceSupplier, 'update').mockRejectedValue({
        index: 'Accounts_bankName_fkey',
      });
      await controllerSupplier.update(supplierId, supplier, res as any);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Banco No existe',
      });
    });

    it('Actualizar un supplier con un numero de cuenta de otra persona', async () => {
      const supplierId = 1;
      const supplier = {
        accountId: '354235',
      };

      jest.spyOn(serviceSupplier, 'update').mockRejectedValue({
        parent: { constraint: 'Accounts_pkey' },
      });
      await controllerSupplier.update(supplierId, supplier, res as any);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Numero de cuenta ya existe',
      });
    });
  });
});
