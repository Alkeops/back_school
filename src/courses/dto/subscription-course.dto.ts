import { IsIn, IsMongoId, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SubscriptionCourseDto {
  @IsNotEmpty()
  @IsMongoId()
  studentId: string;
}
