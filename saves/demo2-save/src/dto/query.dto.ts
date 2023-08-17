import { IsString, IsNumber } from 'class-validator';

export class QueryDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsNumber()
  year: string;
}




























// import { IsString, IsNumber } from 'class-validator';
// import { Transform } from 'class-transformer';

// export class QueryDto {
//   @IsString()
//   name: string;

//   @Transform(({ value }) => +value)
//   @IsNumber()
//   age: number;

//   @Transform(({ value }) => +value)
//   @IsNumber()
//   year: string;
// }
