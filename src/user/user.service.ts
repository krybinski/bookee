import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser } from './user.interface';
import * as bcrypt from 'bcrypt';

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
      password: await this.hashPassword(password),
     });
  }

  async update(id: number, name: string, email: string, password: string): Promise<any> {
    const updatedData = {};

    if (name) {
      updatedData['name'] = name;
    }
    if (email) {
      updatedData['email'] = email;
    }
    if (password) {
      updatedData['password'] = await this.hashPassword(password);
    }

    return await this.userRepository.update(id, updatedData);
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

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hashSync(password, await bcrypt.genSaltSync(10));
  }
}
