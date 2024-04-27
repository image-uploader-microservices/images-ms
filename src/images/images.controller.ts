import { Controller, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';

import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @MessagePattern('uploadImage')
  uploadImage(
    @Payload() image: Express.Multer.File,
  ) {
    return this.imagesService.uploadImage(image);
  }

  @MessagePattern('findAllImages')
  findAll() {
    return this.imagesService.findAll();
  }

  @MessagePattern('findOneImage')
  findOne(@Payload() id: number) {
    return this.imagesService.findOne(id);
  }

  @MessagePattern('updateImage')
  update(@Payload() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(updateImageDto.id, updateImageDto);
  }

  @MessagePattern('removeImage')
  remove(@Payload() id: number) {
    return this.imagesService.remove(id);
  }
}
