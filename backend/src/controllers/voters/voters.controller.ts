import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VotersService } from '../../services/voters/voters.service';
import { CreateVoterDto, UpdateVoterDto } from '../../entities/dtos/voters';
import { Auth, GetUser } from 'src/decorators';
import { User } from 'src/entities/user.entity';
import { Types } from 'mongoose';

@Controller('voter')
@Auth()
export class VotersController {

  constructor(private readonly vtSrv: VotersService) { }

  /**
   * Controller endpoint to create a new voter.
   * 
   * @param crtVtDto The data transfer object containing voter creation details.
   * @returns The created voter.
   */
  @Post()
  async create(@Body() crtVtDto: CreateVoterDto, @GetUser() usr: User) {
    return await this.vtSrv.create({ ...crtVtDto, ecid: new Types.ObjectId(crtVtDto.ecid), uid: usr._id })
  }

  /**
   * Controller endpoint to retrieve a list of all voters.
   * 
   * @returns A list of all voters.
   */
  @Get('list/:code')
  async findAll(@Param('code') code: string) {
    return await this.vtSrv.findAll(code);
  }

  /**
   * Retrieves the total information, specific to the user's role and ID.
   *
   * @param usr - The authenticated user obtained through the GetUser decorator.
   * @returns The total information obtained using the findTotal method of the vtSrv service.
   */
  @Get('total')
  async findTotal(@GetUser() usr: User) {
    return await this.vtSrv.findTotal(usr._id, usr.role);
  }

  /**
   * Controller endpoint to retrieve a specific voter by ID.
   * 
   * @param id The unique identifier of the voter to be retrieved.
   * @returns The voter with the specified ID.
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.vtSrv.findOne(id);
  }

  /**
   * Controller endpoint to update a voter's information by ID.
   * 
   * @param id The unique identifier of the voter to be updated.
   * @param updVtDto The data transfer object containing updated voter details.
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updVtDto: UpdateVoterDto) {
    await this.vtSrv.update(id, updVtDto);
  }

  /**
   * Controller endpoint to remove a voter by ID.
   * 
   * @param id The unique identifier of the voter to be removed.
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.vtSrv.remove(id);
  }
}