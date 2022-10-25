import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Student extends Document {
  @Prop({ unique: true, index: true })
  username: string;
  @Prop({ unique: true, index: true })
  email: string;
  @Prop()
  name: string;
  @Prop()
  introduction: string;
  @Prop()
  age: number;
  @Prop()
  friends: string[];
  @Prop()
  courses: string[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
