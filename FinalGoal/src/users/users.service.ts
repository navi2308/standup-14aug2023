import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create({ email, password }: { email: string; password: string }) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async updateAdmin(id: number, admin: boolean) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new Error('No user found');
    }
    user.admin = admin;
    this.repo.save(user);
    return user;
  }
  async findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    return user;
  }

  find() {
    return this.repo.find({});
  }

  findByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }

  // async update(id: number, attrs: Partial<User>) {
  //   const user = await this.findOne(id);
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   Object.assign(user, attrs);
  //   return this.repo.save(user);
  // }

  // async remove(id: number) {
  //   const user = await this.findOne(id);
  //   if (!user) {
  //     throw new Error('No user found');
  //   }
  //   return this.repo.remove(user);
  // }
}
