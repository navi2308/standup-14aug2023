import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Session,
  Param,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ExportUserDto } from './dtos/export-user.dto';

import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('/auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get("/whoami")
  //  async whoAmI(@Session() session: any){
  //   return this.userService.findOne(session.userId);
  //  }

  @Serialize(ExportUserDto)
  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@Req() req: any) {
    console.log({ currentUser: req.currentUser });
    return req.currentUser;
  }

  @Serialize(ExportUserDto)
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    return user;
  }

  @Serialize(ExportUserDto)
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    // Note : we are using CreateUserDto bec it satify our need.. we can create a signup user dto... for more clearity
    const { email, password } = body;
    const user = await this.authService.signin(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
    return {};
  }

  // @UseGuards(AuthGuard)
  @Serialize(ExportUserDto)
  @Get('/email')
  async findUserByEmail(@Query() query: any) {
    console.log(query);
    return {};
    // return this.userService.findByEmail(query.email);
  }

  // @UseGuards(AuthGuard)
  // @Serialize(ExportUserDto)
  @Get('/all')
  async listAllUsers() {
    return this.userService.find();
  }

  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Serialize(ExportUserDto)
  @Get('/:id')
  async findUser(@Param('id') id: number) {
    const user = this.userService.findOne(id);
    console.log({ user });
    return user;
  }

  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Serialize(ExportUserDto)
  @Patch('/:id')
  async updateAdmin(@Param('id') id: number, @Body() body: any) {
    const user = await this.userService.updateAdmin(id, body.admin);
    console.log({ user });
    return user;
  }
}
