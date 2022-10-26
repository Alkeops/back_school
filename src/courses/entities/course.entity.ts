import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Course extends Document {
  @ApiProperty({ example: 'programacion 1' })
  @Prop({ unique: true, index: true })
  name: string;
  @ApiProperty({ example: 'programacion_1'})
  @Prop({ unique: true, index: true })
  slug: string;
  @ApiProperty({ example: 'Un curso especial de programación' })
  @Prop()
  description: string;
  @ApiProperty({ example: 99.99 })
  @Prop()
  price: number;
  @ApiProperty({ example: ["Typescript", "Javascript"] })
  @Prop()
  tags: string[];
  @ApiProperty({ example: ["6358a1a56ab96c1f48f72256","6358a1a56ab96c1f48f72257"]})
  @Prop()
  students: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
