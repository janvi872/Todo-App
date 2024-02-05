import { Controller, Get, Post, Body, Query, Param, Put, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/task.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { UserGuard } from 'src/guards/login.guard';

@Controller('task')
@UseGuards(UserGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get(':userId')
  // @UseGuards(UserGuard)
  async findAllTasks(@Param('userId') userId: string) {
    return this.tasksService.findAllTasksByUser(userId);
  }

  @Get('/search/:userId')
  findAll(@Param('userId') userId: string, @Query() query: ExpressQuery) {
    console.log(query, "==========")
    return this.tasksService.findAllFiltered(userId, query);
  }

  @Post('/add/:userId')
  async create(@Param('userId') userId: string, @Body() createTaskDto: CreateTaskDto) {
    const task = this.tasksService.create(createTaskDto, userId);
    if (task) {
      return task;
    } else {
      throw new BadRequestException("Task  not inserted");
    }
  }

  @Put(':taskId')
  async updateTask(@Body() createTaskDto: CreateTaskDto, @Param('taskId') taskId: string) {
    return this.tasksService.updateTask(taskId, createTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  // findOne(@Param('id') id: string) {
  //   return this.tasksService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string) {
  //   return this.tasksService.update(+id);
  // }

}
