import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FriendStudentsDto {
  @IsNotEmpty()
  @IsMongoId()
  studentId: string;
}
