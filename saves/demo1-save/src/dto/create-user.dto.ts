// // class-transformer does that convertion from plain Object to Clas instance object

// import {} from 'class-validator';

// export class CreateUserDto {
//   name: string;

//   age: number;

//   email: string;

//   isAdult(): boolean {
//     return this.age >= 18;
//   }
// }

import { IsString, IsNumber, IsEmail } from 'class-validator';

export class CreateUserDto {
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
