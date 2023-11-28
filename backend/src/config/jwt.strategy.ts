import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { JwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(User.name) private readonly usrMd: Model<User>
    ) {
        super({
            secretOrKey: process.env.API_JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    /**
     * 
     * @param payload 
     * @returns 
     */
    async validate(payload: JwtPayload): Promise<User> {
        const { id } = payload, user = await this.usrMd.findById(id)
            .select({ name: 1, username: 1, role: 1, active: 1, boid: 1, sid: 1, _id: 1, password: 1 })
        if (!user)
            throw new UnauthorizedException('Token not valid')
        if (!user.active)
            throw new UnauthorizedException('User is inactive, talk with an admin');
        return user
    }

}