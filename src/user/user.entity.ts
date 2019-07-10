import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hashSync(this.password, await bcrypt.genSaltSync(10));
  }
  @Column()
  password: string;
}
