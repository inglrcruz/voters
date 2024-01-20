import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CreateUserDto, UpdateUserDto } from '../../entities/dtos/users';
import { Auth, GetUser } from 'src/decorators';
import { User } from 'src/entities/user.entity';
import { VotersService } from 'src/services/voters/voters.service';

@Controller('user')
@Auth()
export class UsersController {

  constructor(private readonly usrSrv: UsersService, private readonly vtsSrv: VotersService) { }

  /**
   * Controller endpoint to create a new user.
   * 
   * @param crtUsrDto The data transfer object containing user creation details.
   * @returns The created user.
   */
  @Post()
  async create(@Body() crtUsrDto: CreateUserDto) {
    return await this.usrSrv.create(crtUsrDto);
  }

  /**
   * Retrieves the profile information for the authenticated user.
   *
   * @param usr - The authenticated user obtained through the GetUser decorator.
   * @returns The profile information for the authenticated user.
   */
  @Get('profile')
  async profile(@GetUser() usr: User) {
    return await this.usrSrv.findOne(usr._id);
  }

  /**
   * Controller endpoint to retrieve a list of all users.
   * 
   * @returns A list of all users.
   */
  @Get('list')
  async findAll() {
    return await this.usrSrv.findAll();
  }

  /**
   * Controller endpoint to retrieve a specific user by ID.
   * 
   * @param id The unique identifier of the user to be retrieved.
   * @returns The user with the specified ID.
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usrSrv.findOne(id);
  }

  /**
   * Controller endpoint to update a user's information by ID.
   * 
   * @param id The unique identifier of the user to be updated.
   * @param updUsrDto The data transfer object containing updated user details.
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updUsrDto: UpdateUserDto) {
    await this.usrSrv.update(id, updUsrDto);
  }

  /**
   * Controller endpoint to remove a user by ID.
   * 
   * @param id The unique identifier of the user to be removed.
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usrSrv.remove(id);
    await this.vtsSrv.removeByUser(id)
  }

}