import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Patch,
  Param,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';

import { PostDto } from './dto/post.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(ValidationPipe)
  @Post()
  postValidator(@Body() body: PostDto) {
    console.log({ body });
    return 'hello';
  }

  @Patch(':id')
  pacthsomethign(@Param('id', ParseIntPipe) id: number) {
    console.log({ typeOf: typeof id });
    const param = +id;
    return 'hello';
  }
}
