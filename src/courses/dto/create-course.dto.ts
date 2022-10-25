import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  slug: string;

  @IsString({ each: true })
  @IsArray()
  tags: string[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  students?: string[];
}
