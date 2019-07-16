import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/user.dto';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: UserDTO) {
    return this.authService.login(data);
  }

  @Post('register')
  register(@Body() data: UserDTO) {
    return this.authService.register(data);
  }
}
