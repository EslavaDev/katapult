/* eslint-disable @typescript-eslint/no-empty-function */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Bank } from './bank.entity';
import { BanksController } from './banks.controller';
import { BanksService } from './banks.service';
import { Errors } from './errors';

describe('BanksController', () => {
  let banksController: BanksController;
  let banksService: BanksService;

  const mockBank = {
    create: {
      name: 'test',
    },
    findAll: [
      {
        name: 'test 1',
      },
      {
        name: 'test 2',
      },
    ],
    findOne: {
      name: 'test 2',
    },
    update: {
      name: 'test 3',
    },
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BanksController],
      providers: [
        {
          provide: BanksService,
          useValue: {
            findAll: jest.fn(() => mockBank.findAll),
            findById: jest.fn(() => mockBank.findOne),
            create: jest.fn(() => mockBank.create),
            update: jest.fn(() => mockBank.update),
            delete: jest.fn(),
          },
        },
        Errors,
      ],
    }).compile();

    banksController = app.get<BanksController>(BanksController);
    banksService = app.get<BanksService>(BanksService);
  });
  it('should be defined', () => {
    expect(banksController).toBeDefined();
    expect(banksService).toBeDefined();
  });

  describe('Controller Banks', () => {
    it('devolver una lista con dos elementos', async () => {
      expect(await banksController.findAll()).toEqual(mockBank.findAll);
    });
  });

  describe('Mirando las validaciones', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    it('crear un banco', async () => {
      const valueBank = {
        name: 'test',
      };
      jest.spyOn(banksService, 'create').mockResolvedValue(valueBank as Bank);
      await banksController.create(valueBank, res as any);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(valueBank);
    });

    it('error al crear un banco', async () => {
      const bankCreate = { name: 'Test Bank', routingNumber: '12345678' };
      jest.spyOn(banksService, 'create').mockRejectedValue('Datos Invalidos');

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await banksController.create(bankCreate, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Problemas de base de datos',
      });
    });

    it('error banco ya registrado', async () => {
      const bankCreate = { name: 'test1' };

      jest.spyOn(banksService, 'create').mockImplementation(() => {
        throw {
          name: 'SequelizeUniqueConstraintError',
        };
      });

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await banksController.create(bankCreate, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Nombre de banco ya registrado',
      });
    });
  });

  it('Buscar un Banco', async () => {
    expect(await banksController.findOne('test 2')).toEqual(mockBank.findOne);
  });

  it('eliminar un banco', async () => {
    expect(await banksController.remove('test')).toBe('Banco Eliminado');
  });

  it('no eliminar un banco', async () => {
    jest.spyOn(banksService, 'delete').mockResolvedValue(0);
    expect(banksController.remove('test 5')).rejects.toThrow(NotFoundException);
  });
});
