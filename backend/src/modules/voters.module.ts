import { Module } from '@nestjs/common'
import { VotersService } from '../services/voters/voters.service'
import { VotersController } from '../controllers/voters/voters.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { VoterSchema, Voter } from '../entities/voter.entity'
import { AuthModule } from './auth.module'

@Module({
  controllers: [VotersController],
  providers: [VotersService],
  imports: [MongooseModule.forFeature([{ name: Voter.name, schema: VoterSchema }]), AuthModule]
})
export class VotersModule { }
