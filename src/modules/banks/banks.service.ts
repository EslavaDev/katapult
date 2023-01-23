import { Inject, Injectable } from '@nestjs/common';
import { BANK_REPOSITORY } from 'src/core/constants';
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
      where: { id },
    });
  }

  async update(id: string, data) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.bankRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }

  async delete(id: string) {
    return await this.bankRepository.destroy({ where: { id } });
  }
}
