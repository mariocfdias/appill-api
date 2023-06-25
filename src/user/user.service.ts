import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({
      data: { id: uuidv4(), ...data },
    });
  }

  async update(id: string, data: UpdatePutUserDTO) {
    const { name, email, phoneNumber } = data;
    return await this.prisma.user.update({
      data: { name, email, phoneNumber },
      where: { id },
    });
  }

  async getById(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }
}
