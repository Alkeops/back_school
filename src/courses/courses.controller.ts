import { ParseMongoIdPipe } from './../common/pipes/mongo-id.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { SubscriptionCourseDto } from './dto/subscription-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.coursesService.findOne(term);
  }

  @Post('subscription/:id')
  toggleSubscription(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() subscriptionCourseDto: SubscriptionCourseDto,
  ) {
    return this.coursesService.toggleSubscription(id, subscriptionCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
