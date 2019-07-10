import { Controller, Get, Param, Delete, Post, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number): Promise<IUser> {
    return this.userService.find(id);
  }

  @Post()
  create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<IUser> {
    return this.userService.create(name, email, password);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<any> {
    return this.userService.update(id, name, email, password);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<any> {
    return this.userService.delete(id);
  }
}
