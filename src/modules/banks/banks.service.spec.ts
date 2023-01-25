import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { BANK_REPOSITORY } from 'src/core/constants';
import { Bank } from './bank.entity';
import { BanksService } from './banks.service';
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
describe('BanksService', () => {
  let service: BanksService;
  let model: typeof Bank;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BANK_REPOSITORY,
          useValue: {
            findAll: jest.fn(() => mockBank.findAll),
            findOne: jest.fn(() => mockBank.findOne),
            create: jest.fn(() => mockBank.create),
            update: jest.fn(() => mockBank.update),
            destroy: jest.fn(),
          },
        },
        BanksService,
      ],
    }).compile();

    service = module.get<BanksService>(BanksService);
    model = module.get<typeof Bank>(BANK_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should get banks', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockBank.findAll);
  });

  it('should get a single bank', () => {
    const findSpy = jest.spyOn(model, 'findOne');
    expect(service.findById('id'));
    expect(findSpy).toBeCalledWith({ where: { name: 'id' } });
  });

  it('should get banks two entity', async () => {
    const result = await service.findAll();
    expect(result.length).toEqual(2);
  });

  it('should create bank success', async () => {
    const createSpy = jest.spyOn(model, 'create');
    const result = await service.create({ name: 'test' });
    console.log(result);
    expect(result).toEqual(mockBank.create);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });

  it('should create bank error', async () => {
    const result = await service.create({ name: 'test2' });
    expect(result).not.toEqual({ name: 'test2' });
  });

  it('delete bank', async () => {
    const findSpy = jest.spyOn(model, 'destroy').mockResolvedValue(1);
    const retVal = await service.delete('id');
    expect(findSpy).toBeCalledWith({ where: { name: 'id' } });
    expect(findSpy).toBeCalledTimes(1);
    expect(typeof retVal).toStrictEqual('number');
    expect(retVal).toBeDefined();
  });
});
