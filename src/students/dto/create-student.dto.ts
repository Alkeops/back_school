import { IsEmail, IsInt, IsString, MinLength } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MinLength(5)
  username: string;
  @IsString()
  @MinLength(5)
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  introduction: string;
  @IsInt()
  age: number;
}
