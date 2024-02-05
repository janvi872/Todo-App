import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
// import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Task {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    due_date: string;

    @Prop()
    status: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);