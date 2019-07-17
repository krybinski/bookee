import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser } from './user.interface';
import { hashPassword } from '../common/helpers';
import { UserDTO } from '../user/user.dto';

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

  async findOneByEmail(email: string): Promise<IUser> {
    return await this.userRepository.findOne({ email });
  }

  async create(data: UserDTO): Promise<IUser> {
    return await this.userRepository.save({
      name: data.name,
      email: data.email,
      password: await hashPassword(data.password),
     });
  }

  async update(id: number, data: UserDTO): Promise<any> {
    const updatedData = {};

    if (data.name) {
      updatedData['name'] = data.name;
    }
    if (data.email) {
      updatedData['email'] = data.email;
    }
    if (data.password) {
      updatedData['password'] = await hashPassword(data.password);
    }

    return await this.userRepository.update(id, updatedData);
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

  private async findById(id: number): Promise<IUser> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
