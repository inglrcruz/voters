import { Module } from '@nestjs/common';
import { ElectoralCentersService } from '../services/electoral-centers/electoral-centers.service';
import { ElectoralCentersController } from '../controllers/electoral-centers/electoral-centers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';
import { ElectoralCenter, ElectoralCenterSchema } from 'src/entities/electoral-center.entity';

@Module({
  controllers: [ElectoralCentersController],
  providers: [ElectoralCentersService],
  imports: [
    MongooseModule.forFeature([{ name: ElectoralCenter.name, schema: ElectoralCenterSchema }]), AuthModule]
})
export class ElectoralCentersModule { }
