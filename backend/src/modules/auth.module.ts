import { Module } from '@nestjs/common';
import { UsersService } from '../services/users/users.service';
import { AuthController } from '../controllers/auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/config/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [UsersService, JwtStrategy],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          secret: process.env.API_JWT_SECRET,
          signOptions: {
            expiresIn: '365d'
          }
        }
      }
    })
  ],
  exports: [JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule { }