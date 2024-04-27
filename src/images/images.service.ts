import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger = new Logger('ImagesService');

  async onModuleInit() {
    await this.$connect;
    this.logger.log('Database connected');
  }

  async uploadImage(image: Express.Multer.File): Promise<string> {
    if (!image) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'You must insert an image to upload',
      });
    }

    console.log(image);

    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
