import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SubscriptionCourseDto {
  @IsNotEmpty()
  @IsMongoId()
  studentId: string;
}
