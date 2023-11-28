import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Enclosure } from './enclosure.entity';

@Schema({ collection: "electoral-centers" })
export class ElectoralCenter extends Document {

    @Prop({ type: Types.ObjectId, ref: 'Enclosure' })
    eid: Enclosure;

    @Prop({ type: String, required: true })
    code: String;

    @Prop({ type: Number, required: true })
    number_registered: Number;
}

export const ElectoralCenterSchema = SchemaFactory.createForClass(ElectoralCenter);