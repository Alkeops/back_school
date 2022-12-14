import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';

import { StudentsService } from './../students/students.service';
import { SubscriptionCourseDto } from './dto/subscription-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    private readonly studentsService: StudentsService,
    private readonly logger: Logger,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    createCourseDto.name = createCourseDto.name.toLowerCase();
    try {
      const course = await this.courseModel.create(createCourseDto);
      return course;
    } catch (e) {
      if (e.code === 11000) {
        return new BadRequestException(
          `Course with this values already exists ${JSON.stringify(
            e.keyValue,
          )}`,
        );
      }
      this.logger.error(e);

      throw new InternalServerErrorException('Error creating course');
    }
  }

  async findAll() {
    return await this.courseModel.find();
  }

  async findOne(term: string) {
    let course: Course;
    if (isValidObjectId(term))
      course = await this.courseModel.findOne({ _id: term });
    if (!course) course = await this.courseModel.findOne({ slug: term });
    if (!course) throw new BadRequestException('Course not found');
    return course;
  }

  async toggleSubscription(id: string, subs: SubscriptionCourseDto) {
    const course = await this.courseModel.findById(id);
    if (!course) throw new BadRequestException('Course not found');

    const student = await this.studentsService.findOne(subs.studentId);
    if (!student) throw new BadRequestException('Student not found');
    //Add student to course
    if (course.students.includes(subs.studentId)) {
      course.students = course.students.filter(
        (student) => student !== subs.studentId,
      );
      student.courses = student.courses.filter((course) => course !== id);
    } else {
      course.students.push(subs.studentId);
      student.courses.push(id);
    }
    await student.save();
    await course.save();
    return course;
  }

  async remove(id: string) {
    return await this.courseModel.findByIdAndDelete(id);
  }
}
