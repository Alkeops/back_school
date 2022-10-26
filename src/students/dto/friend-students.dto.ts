import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FriendStudentsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  studentId: string;
}
