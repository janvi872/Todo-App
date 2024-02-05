import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

// import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);