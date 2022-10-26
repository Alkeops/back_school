import { FriendStudentsDto } from './dto/friend-students.dto';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-students.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Student } from './entities/student.entity';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({ status: 201, description: 'Student created', type: Student })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all' })
  @ApiResponse({
    status: 200,
    description: 'Get all',
    type: Student,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':term')
  @ApiOperation({ summary: 'Get one' })
  @ApiResponse({ status: 201, description: 'Get one', type: Student })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findOne(@Param('term') term: string) {
    return this.studentsService.findOne(term);
  }

  @Post(':id/addFriend')
  @ApiOperation({ summary: 'Add friend' })
  @ApiResponse({ status: 201, description: 'Friend added', type: Student })
  @ApiResponse({ status: 400, description: 'Bad request' })
  toggleFriend(
    @Param('id') id: string,
    @Body() friendStudentsDto: FriendStudentsDto,
  ) {
    return this.studentsService.toggleFriend(id, friendStudentsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one' })
  @ApiResponse({ status: 201, description: 'Delete student', type: Student })
  @ApiResponse({ status: 400, description: 'Bad request' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
