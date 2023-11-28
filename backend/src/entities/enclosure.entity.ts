import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Enclosure extends Document {

    @Prop({ type: String })
    code: String;

    @Prop({ type: String })
    description: String;

}

export const EnclosureSchema = SchemaFactory.createForClass(Enclosure);