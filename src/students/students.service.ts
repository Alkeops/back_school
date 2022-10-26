import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateStudentDto } from './dto/create-students.dto';
import { FriendStudentsDto } from './dto/friend-students.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
    private readonly logger: Logger,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    createStudentDto.username = createStudentDto.username.toLowerCase();
    try {
      const student = await this.studentModel.create(createStudentDto);
      return student;
    } catch (e) {
      if (e.code === 11000) {
        return new BadRequestException(
          `Student with this values already exists ${JSON.stringify(
            e.keyValue,
          )}`,
        );
      }
      this.logger.error(e);

      throw new InternalServerErrorException('Error adding student');
    }
  }

  async findAll() {
    return await this.studentModel.find();
  }

  async findOne(term: string) {
    let student: Student;
    if (isValidObjectId(term)) {
      student = await this.studentModel.findOne({ _id: term });
    }
    if (!student) student = await this.studentModel.findOne({ username: term });

    if (!student) throw new BadRequestException('Student not found');
    return student;
  }

  async toggleFriend(id: string, friendStudentsDto: FriendStudentsDto) {
    //TODO create middleware or validation pipe
    if (id === friendStudentsDto.studentId)
      throw new BadRequestException(
        "We're sorry you're lonely, but you can't be your own friend.",
      );
    const user = await this.findOne(id);
    const friend = await this.findOne(friendStudentsDto.studentId);
    if (!user || !friend) throw new BadRequestException('Users not found');

    //TODO refactor this
    //Add friends
    if (user.friends.includes(friendStudentsDto.studentId)) {
      user.friends = user.friends.filter(
        (friend) => friend !== friendStudentsDto.studentId,
      );
      friend.friends = friend.friends.filter((_friend) => _friend !== id);
    } else {
      user.friends.push(friendStudentsDto.studentId);
      friend.friends.push(id);
    }

    await friend.save();
    await user.save();
    return user;
  }

  async remove(id: string) {
    return await this.studentModel.findByIdAndDelete(id);
  }
}
