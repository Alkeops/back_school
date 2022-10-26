import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  tags: string[];

  @ApiPropertyOptional()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  students?: string[];
}
