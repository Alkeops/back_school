import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SubscriptionCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  studentId: string;
}
