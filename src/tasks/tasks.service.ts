import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const createdUser = new this.taskModel({ ...createTaskDto, user: userId });
    return createdUser.save();
  }

  async findAllTasksByUser(userId: string): Promise<Task[]> {

    return this.taskModel.find({ user: userId }).sort({ due_date: 1 }).populate('user').exec();
  }


  async findAllFiltered(userId: string, query: Query): Promise<Task[]> {

    const itemPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = itemPerPage * (currentPage - 1);

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
    return await this.taskModel.find({ ...title, ...status }).populate('user').limit(itemPerPage).skip(skip).exec();
    // const queries = { user: userId };

    // if (dueDate) {
    //   queries['due_date'] = dueDate;
    // }

    // if (status) {
    //   queries['status'] = status;
    // }

    // console.log(query)
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

  async

  // findOne(id: number) {
  //   return `This action returns a #${id} task`;
  // }

  // update(id: number) {
  //   return `This action updates a #${id} task`;
  // }

}
