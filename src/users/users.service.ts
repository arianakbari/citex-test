import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User, IUser } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(
    mobile: string,
    password: string,
    age: number,
    name: string,
  ): Promise<IUser> {
    const user = this.repo.create({ mobile, password, age, name });

    return this.repo.save(user);
  }

  findOne(id: number): Promise<IUser> {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id } });
  }

  find(mobile: string): Promise<IUser[]> {
    return this.repo.find({ where: { mobile } });
  }

  async update(id: number, attrs: Partial<User>): Promise<IUser> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<IUser> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }

  async generatePasswordHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  comparePasswordHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
