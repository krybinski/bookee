import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken() {
    const user: JwtPayload = { email: 'test@email.com' };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async signIn(): Promise<string> {
    const user: JwtPayload = { email: 'test@email.com' };
    return this.jwtService.sign(user);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByEmail(payload.email);
  }
}
