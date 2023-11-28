import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users.module';
import { VotersModule } from './modules/voters.module';
import { AuthModule } from './modules/auth.module';
import { ElectoralCentersModule } from './modules/electoral-centers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule, UsersModule, VotersModule, ElectoralCentersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
