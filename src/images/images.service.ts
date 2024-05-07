import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Image, PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

import { UpdateImageDto } from './dto/update-image.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ImagesService extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger = new Logger('ImagesService');

  async onModuleInit() {
    await this.$connect;
    this.logger.log('Database connected');
  }

  async uploadImage(image: Express.Multer.File): Promise<Image> {
    if (!image) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'You must insert an image to upload',
      });
    };
    
    const uniqueImageName: string = `${randomUUID()}-${image.originalname}`;

    const imageToSave: Image = await this.image.create({
      data: {
        imageUrl: uniqueImageName,
      },
    });

    return imageToSave;
  }

  async findAll(): Promise<Image[]> {
    const images: Image[] = await this.image.findMany();

    return images;
  }

  async findOne(id: string): Promise<Image> {
    const image: Image = await this.image.findUnique({
      where: {
        id,
      },
    });

    if (!image) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Image with id ${id} not found`,
      });
    };

    return image;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
