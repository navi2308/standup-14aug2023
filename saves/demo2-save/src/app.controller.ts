import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

import { QueryDto } from './dto/query.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/q')
  parseQuery(@Query() query: QueryDto): void {
    console.log({ query });
  }

  @Get(':id')
  getById(@Param('id') id: number): string {
    console.log(typeof id);
    return this.appService.acceptNumber(+id);
  }
}
