import { Controller, Post, Body, Patch, NotFoundException } from '@nestjs/common';
import { AuthDto, ChangePasswordDto } from '../../entities/dtos/users'
import { UsersService } from 'src/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Auth, GetUser } from 'src/decorators';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly usrSrv: UsersService,
    private readonly jwtSrv: JwtService
  ) { }

  /**
   * Controller endpoint for user authentication.
   * 
   * @param authDto An object containing user credentials for authentication.
   * @returns An object containing a JWT token and user role upon successful authentication.
   */
  @Post()
  async auth(@Body() authDto: AuthDto) {
    const { _id, role, username } = await this.usrSrv.auth(authDto)
    return { token: this.jwtSrv.sign({ id: _id }), role, username }
  }

  /**
   * Controller endpoint for changing user password.
   * 
   * @param chPassDto An object containing the current and new passwords.
   * @param usr The authenticated user obtained from the JWT token.
   * @returns The updated user object after changing the password.
   */
  @Patch('change-password')
  @Auth()
  async changePassword(@Body() chPassDto: ChangePasswordDto, @GetUser() usr: User) {
    const { current_password, password } = chPassDto
    if (!bcrypt.compareSync(current_password.toString(), usr.password.toString()))
      throw new NotFoundException(`La contraseña actual es incorrecta`)
    return await this.usrSrv.update(usr._id, { password: bcrypt.hashSync(password, 10) })
  }

}