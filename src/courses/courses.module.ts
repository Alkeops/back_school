import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseSchema } from './entities/course.entity';

import { StudentsModule } from 'src/students/students.module';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, Logger],
  imports: [
    StudentsModule,
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  exports: [
    CoursesService
  ]
})
export class CoursesModule {}
