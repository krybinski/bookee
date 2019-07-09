import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity';
// import { User } from './user.model';

@Injectable()
export class UsersService {
  // private users: User[] = [];

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // getAll() {
  //   return this.users;
  // }

  // findOneByEmail(email: string) {
  //   // TODO: implement
  //   return this.users[0];
  // }
}
