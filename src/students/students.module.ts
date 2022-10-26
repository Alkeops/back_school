import {  Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student, StudentSchema } from './entities/student.entity';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, Logger],
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  exports: [StudentsService],
})
export class StudentsModule {}
