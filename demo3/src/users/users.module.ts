// import { Module } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user.entity';
// import { AuthService } from './auth.service';

// import { APP_INTERCEPTOR } from '@nestjs/core';

// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

// @Module({
//   imports: [TypeOrmModule.forFeature([User])],
//   providers: [
//     UsersService,
//     AuthService,
//     { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
//   ],
//   controllers: [UsersController],
// })
// export class UsersModule {}

import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
