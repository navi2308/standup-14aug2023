import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // check if email is in use
    const users = await this.usersService.findByEmail(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    // Hash the password to create a new user

    //step 1: Create a salt
    const salt = randomBytes(8).toString('hex');

    // step 2: Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // step 3: Join the hashed result and the salt together

    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create({ email, password: result });

    return user;
  }

  //signin method
  async signin(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Password is incorrect');
    }
    return user;
  }
}
