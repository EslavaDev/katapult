import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { Bank } from './bank.entity';
import { BanksValidationPipe } from './banks.pipe';
import { bankSchema } from './banks.schemas';
import { BanksService } from './banks.service';
import { BankDto } from './dto/bank.dto';

@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Get()
  async findAll() {
    const banks = await this.banksService.findAll();
    if (!banks.length) {
      throw new NotFoundException('No hay bancos');
    }
    return banks;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Bank> {
    const bank = await this.banksService.findById(id);

    if (!bank) {
      throw new NotFoundException('No existe ningun banco con ese id');
    }

    return bank;
  }
  @UsePipes(new BanksValidationPipe(bankSchema))
  @Post()
  async create(@Body() post: BankDto): Promise<Bank> {
    return await this.banksService.create(post);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new BanksValidationPipe(bankSchema)) post: BankDto,
  ): Promise<Bank> {
    const { numberOfAffectedRows, updatedPost } =
      await this.banksService.update(id, post);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('No existe ningun banco con ese id');
    }

    return updatedPost;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.banksService.delete(id);
    if (deleted === 0) {
      throw new NotFoundException('No existe ningun banco con ese id');
    }

    return 'Successfully deleted';
  }
}
