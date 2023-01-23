import { Inject, Injectable } from '@nestjs/common';
import { BANK_REPOSITORY } from '../../core/constants';
import { Bank } from './bank.entity';
import { BankDto } from './dto/bank.dto';

@Injectable()
export class BanksService {
  constructor(
    @Inject(BANK_REPOSITORY) private readonly bankRepository: typeof Bank,
  ) {}

  async create(bank: BankDto): Promise<Bank> {
    return await this.bankRepository.create<Bank>(bank);
  }

  async findAll(): Promise<Bank[]> {
    return await this.bankRepository.findAll();
  }

  async findById(id: string): Promise<Bank> {
    return await this.bankRepository.findOne({
      where: { name: id },
    });
  }

  async update(id: string, data) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.bankRepository.update(
        { ...data },
        { where: { name: id }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }

  async delete(id: string) {
    return await this.bankRepository.destroy({ where: { name: id } });
  }
}
