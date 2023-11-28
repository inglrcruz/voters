import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, now } from 'mongoose';
import { User } from './user.entity';
import { ElectoralCenter } from './electoral-center.entity';

@Schema()
export class Voter extends Document {

    @Prop({ type: String, required: true })
    full_name: String;

    @Prop({ type: String, required: true, unique: true, index: true })
    identification_card: String;

    @Prop({ type: String, required: true })
    address: String;

    @Prop({ type: Types.ObjectId, ref: 'ElectoralCenter' })
    ecid: ElectoralCenter

    @Prop({ type: Types.ObjectId, ref: 'Users' })
    uid: User;

    @Prop({ type: Date, default: now() })
    created: Date;
}

export const VoterSchema = SchemaFactory.createForClass(Voter)