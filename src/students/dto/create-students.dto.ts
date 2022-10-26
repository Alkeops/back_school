import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  username: string;
  @ApiProperty()
  @IsString()
  @MinLength(5)
  name: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  introduction: string;
  @IsInt()
  @IsPositive()
  @ApiProperty()
  age: number;
}
