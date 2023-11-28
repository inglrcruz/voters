import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

@Schema()
export class User extends Document {

    @Prop({ type: String, required: true })
    name: String;

    @Prop({ type: String, required: true, unique: true, index: true })
    username: String;

    @Prop({ type: String, required: true })
    password: String;

    @Prop({ required: true, enum: ['user', 'admin'] })
    role: string;

    @Prop({ type: Boolean, default: true })
    active: boolean;

    @Prop({ type: Date, default: now() })
    created: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);