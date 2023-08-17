// class-transformer does that convertion from plain Object to Clas instance object

import { IsString, IsNumber, IsEmail } from 'class-validator';

export class PostDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsEmail()
  email: string;

  isAdult(): boolean {
    return this.age >= 18;
  }
}
