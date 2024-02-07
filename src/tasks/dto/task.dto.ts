import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Task } from "../schemas/task.schema";


export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDateString()
    due_date: Date;

    @IsString()
    status: string;

}
