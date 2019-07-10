import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<IUser[]> {
    return await this.userRepository.find();
  }

  async find(id: number): Promise<IUser> {
    return this.findById(id);
  }

  async create(name: string, email: string, password: string): Promise<IUser> {
    return await this.userRepository.save({
      name: name,
      email: email,
      password: password
     });
  }

  async update(id: number, name: string, email: string, password: string): Promise<any> {
    const user: IUser = await this.findById(id);

    if (name) {
      user['name'] = name;
    }
    if (email) {
      user['email'] = email;
    }
    if (password) {
      user['password'] = password;
    }

    return await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

  private async findById(id: number): Promise<IUser> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Could not found user.');
    }
    return user;
  }
}
