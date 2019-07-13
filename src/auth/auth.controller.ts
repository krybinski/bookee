import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
	constructor(
		private readonly authService: AuthService
  ) {}

  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return this.authService.login(email, password);
  }

  // TODO: add register method
  // @Post()
  // register() {
    // userService.register
  // }

	// @Get('verify')
	// @UseGuards(AuthGuard('jwt'))
	// public async verify(@Headers('Authorization') token: string) {
	// 	return this.authService.verifyToken(token);
	// }

	// @Post('token')
	// public async getToken(@Body() credentials: any) {
	// 	return await this.authService.createToken(credentials);
	// }
}
