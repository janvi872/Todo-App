import { Controller, Get, Post, Body, Query, Param, Put, Delete, Request, Headers, BadRequestException, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/task.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { UserGuard } from 'src/guards/login.guard';
import { request } from 'express';

@Controller('task')
// @UseGuards(UserGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @UseGuards(UserGuard)
  @Get('/')
  findAllTasks(@Request() request: Request) {
    const userId = request['user'];
    console.log(request['user'], "======")
    const tasks = this.tasksService.findAllTasksByUserId(userId);
    return tasks;
  }

  @UseGuards(UserGuard)
  @Post('/add')
  create(@Request() req: any, @Body() createTaskDto: CreateTaskDto) {
    const userId = req['user'];
    console.log(req['user'], "===userId");
    return this.tasksService.create(createTaskDto, userId);
  }

  @UseGuards(UserGuard)
  @Get('/search')
  findAll(@Request() request: Request, @Query() query: any) {
    const userId = request['user'];
    console.log(userId)
    return this.tasksService.findAllFiltered(userId, query);
  }


  @Put(':taskId')
  async updateTask(@Body() createTaskDto: CreateTaskDto, @Param('taskId') taskId: string) {
    return this.tasksService.updateTask(taskId, createTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }


}
