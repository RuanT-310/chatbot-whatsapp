import { Injectable } from '@nestjs/common';
import { CreateWahaDto } from './dto/create-waha.dto';
import { UpdateWahaDto } from './dto/update-waha.dto';

@Injectable()
export class WahaService {
  create(createWahaDto: CreateWahaDto) {
    return 'This action adds a new waha';
  }

  findAll() {
    return `This action returns all waha`;
  }

  findOne(id: number) {
    return `This action returns a #${id} waha`;
  }

  update(id: number, updateWahaDto: UpdateWahaDto) {
    return `This action updates a #${id} waha`;
  }

  remove(id: number) {
    return `This action removes a #${id} waha`;
  }
}
