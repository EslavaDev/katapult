import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Bank } from './bank.entity';
import { SchemaValidationPipe } from '../pipes/schemaValidation.pipe';
import { bankSchema } from './banks.schemas';
import { BanksService } from './banks.service';
import { BankDto } from './dto/bank.dto';
import { Response } from 'express';
import { Errors } from './errors';

@Controller('banks')
export class BanksController {
  constructor(
    private readonly banksService: BanksService,
    private error: Errors,
  ) {}

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
      throw new NotFoundException('No existe ningun banco con ese nombre');
    }

    return bank;
  }
  @UsePipes(new SchemaValidationPipe(bankSchema))
  @Post()
  async create(@Body() post: BankDto, @Res() res: Response) {
    try {
      res.status(200).json(await this.banksService.create(post));
    } catch (error) {
      this.error = new Errors(error);
      const { code, message } = this.error.messageError();
      res.status(code).json({ message });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new SchemaValidationPipe(bankSchema)) post: BankDto,
    @Res() res: Response,
  ) {
    try {
      const { numberOfAffectedRows, updatedPost } =
        await this.banksService.update(id, post);

      if (numberOfAffectedRows === 0) {
        throw new NotFoundException('No existe ningun banco con ese nombre');
      }

      res.status(200).json({ updatedPost });
    } catch (error) {
      this.error = new Errors(error);
      const { code, message } = this.error.messageError();
      res.status(code).json({ message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.banksService.delete(id);
    if (deleted === 0) {
      throw new NotFoundException('No existe ningun banco con ese nombre');
    }

    return 'Banco Eliminado';
  }
}
