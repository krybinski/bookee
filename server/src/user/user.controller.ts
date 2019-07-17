import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserDTO } from './user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number): Promise<IUser> {
    return this.userService.find(id);
  }

  @Post()
  create(@Body() data: UserDTO): Promise<IUser> {
    return this.userService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UserDTO): Promise<any> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<any> {
    return this.userService.delete(id);
  }
}
