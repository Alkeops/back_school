import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ 
    MongooseModule.forRoot("mongodb://localhost:27017/school"), StudentsModule, CoursesModule, CommonModule,
  ],
})
export class AppModule {}
