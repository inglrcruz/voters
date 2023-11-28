import { Module } from '@nestjs/common'
import { UsersService } from '../services/users/users.service'
import { VotersService } from '../services/voters/voters.service'
import { UsersController } from '../controllers/users/users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema, User } from '../entities/user.entity'
import { AuthModule } from './auth.module'
import { Voter, VoterSchema } from 'src/entities/voter.entity'

@Module({
  controllers: [UsersController],
  providers: [UsersService, VotersService],
  imports: [
    MongooseModule.forFeature([{ name: Voter.name, schema: VoterSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AuthModule]
})
export class UsersModule { }
