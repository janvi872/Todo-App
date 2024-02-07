import { Injectable, Body, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { Query } from 'express-serve-static-core';
@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

  async findAllTasksByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.taskModel.find({ user: userId }).sort({ due_date: 1 }).exec();
    // return tasks;
    if (!tasks) {
      throw new NotFoundException("Tasks not found for this user.")
    } return tasks;
  }

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const createdTask = await this.taskModel.create({ ...createTaskDto, user: userId });
    return createdTask.save();
  }


  async findAllFiltered(userId: string, query: Query): Promise<Task[]> {

    const itemPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = itemPerPage * (currentPage - 1);
    console.log(userId)
    const title = query.title ?
      {
        "title": {
          $regex: query.title,
          $options: 'i',
        }
      } : {};
    const status = query.status ? {
      "status": {
        $regex: query.status,
        $options: 'i',
      }
    } : {};
    const userFilter = { user: userId };
    return await this.taskModel.find({ ...title, ...status, ...userFilter }).populate('user').limit(itemPerPage).skip(skip).exec();
  }


  async updateTask(taskId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(taskId, createTaskDto).exec();
    // if (!newTask) {
    //   throw new NotFoundException("Task not found");
    // }
    // return newTask;
  }

  async remove(id: string): Promise<Task> {
    // console.log(`User Deleted ${id}`)
    const task = await this.taskModel.findByIdAndDelete(id).exec();
    if (!task) {
      throw new NotFoundException("User not found");
    }
    return task;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} task`;
  // }

  // update(id: number) {
  //   return `This action updates a #${id} task`;
  // }

}
