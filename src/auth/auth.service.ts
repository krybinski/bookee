import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { comparePasswords } from '../common/helpers';
import { IUser } from '../user/user.interface';
import { MESSAGE } from '../common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.validateUser(email);
    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(MESSAGE.AUTH.PASSWORD_IS_NOT_VALID);
    }

    const token = await this.createToken(user);

    return {
      email: user.email,
      token
    }
  }

  async createToken({ email, password }: IUser) {
    const expiresIn = 60 * 60 * 24;
    const accessToken = await this.jwtService.sign({ email, password });
		return {
			expiresIn,
			accessToken,
		};
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token: ', HttpStatus.FORBIDDEN);
    }

    const token = auth.split(' ')[1];

    try {
      const decoded = await this.jwtService.verify(token);
      return decoded;
    } catch(err) {
      const message = `Token error: ${err.message || err.name}`;
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }

  // async createToken(credentials: any) {
	// 	const user = await this.userService.login(credentials);
	// 	const expiresIn = 60 * 60;
	// 	const accessToken = this.jwtService.sign({ email: user.email });
	// 	return {
	// 		expiresIn,
	// 		accessToken,
	// 	};
	// }

	async validateUser(email: string): Promise<IUser> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(MESSAGE.USER.NOT_FOUND);
    }
    return user;
	}
}
