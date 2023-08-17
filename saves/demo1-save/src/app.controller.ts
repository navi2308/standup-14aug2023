import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';

import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //Goal 1: Get the incoming data from the request body

  @UsePipes(ValidationPipe)
  @Post()
  createSomething(@Body() body: CreateUserDto): string {
    // How do I confirm that our body should include email, name and age along with it's type?

    // Option 1: Do a manual check and throw error

    if (body.age === undefined) {
      throw new Error('Age is required');
    }
    if (typeof body.age !== 'number') {
      throw new Error('Age must be a number');
    }

    // Option 2: Use a library like class-validator
    // https://github.com/typestack/class-validator

    // Now class-validator can be compared to express-validator in express or joi/zod....

    // But Nest provide us a way to perform this validation in a much easier way... using pipes
    // console.log(body.isAdult());
    console.log({ body });
    return '';
  }
}

//// Difference between class instance object and plain object

// const plainObject = {
//   name: 'Navi',
//   age: 22,
//   email: 'navi@gmail.com',
// };

// console.log({ plainObject });

// class UserClass {
//   name: string;
//   age: number;
//   email: string;
//   constructor(private readonly plainObject: any) {
//     this.name = plainObject.name;
//     this.age = plainObject.age;
//     this.email = plainObject.email;
//   }
// }

// const instanceObject = new UserClass(plainObject);
// console.log({ instanceObject });

// // Setting Golbal validationPipe

// // In main.ts

// import { ValidationPipe } from '@nestjs/common';

// app.useGlobalPipes(
//   new ValidationPipe({
//     transform: true,
//     transformOptions: { enableImplicitConversion: true },
//     whitelist: true,
//   }),
// );

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(
//     new ValidationPipe({
//       transform: true,
//       transformOptions: { enableImplicitConversion: true },
//       whitelist: true,
//     }),
//   );
//   await app.listen(3000);
// }
// bootstrap();
