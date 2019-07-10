import { Controller, Get, Param } from '@nestjs/common';
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
  find(@Param('id') id: string): Promise<IUser> {
    return this.userService.find(id);
  }
}
