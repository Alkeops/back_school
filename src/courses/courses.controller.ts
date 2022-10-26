import { ParseMongoIdPipe } from './../common/pipes/mongo-id.pipe';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { SubscriptionCourseDto } from './dto/subscription-course.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Course } from './entities/course.entity';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Create course' })
  @ApiResponse({ status: 201, description: 'Course created', type: Course })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all' })
  @ApiResponse({
    status: 200,
    description: 'Get All',
    type: Course,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':term')
  @ApiOperation({ summary: 'Get one' })
  @ApiResponse({ status: 200, description: 'Get one', type: Course })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findOne(@Param('term') term: string) {
    return this.coursesService.findOne(term);
  }

  @Post('subscription/:id')
  @ApiOperation({ summary: 'New user' })
  @ApiResponse({ status: 201, description: 'Add user', type: Course })
  @ApiResponse({ status: 400, description: 'Bad request' })
  toggleSubscription(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() subscriptionCourseDto: SubscriptionCourseDto,
  ) {
    return this.coursesService.toggleSubscription(id, subscriptionCourseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete course' })
  @ApiResponse({ status: 201, description: 'Delete course', type: Course })
  @ApiResponse({ status: 400, description: 'Bad request' })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
