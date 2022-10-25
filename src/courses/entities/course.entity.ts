import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Course extends Document {
  @Prop({ unique: true, index: true })
  name: string;
  @Prop({ unique: true, index: true })
  slug: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop()
  tags: string[];
  @Prop()
  students: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
