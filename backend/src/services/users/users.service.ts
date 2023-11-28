import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, AuthDto } from '../../entities/dtos/users';
import { User } from 'src/entities/user.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly usrMd: Model<User>
  ) { }

  /**
   * Authenticates a user based on the provided credentials.
   * 
   * @param authDto An object containing username and password for authentication.
   * @returns The user object if authentication is successful.
   * @throws UnauthorizedException if the username does not exist or the password is incorrect.
   */
  async auth(authDto: AuthDto) {
    const user: any = await this.usrMd.findOne({ username: authDto.username })
    if (user === null)
      throw new UnauthorizedException(`Este nombre de usuario no existe`)
    if (!bcrypt.compareSync(authDto.password, user.password))
      throw new UnauthorizedException('La contraseña ingresada es incorrecta')
    return user
  }

  /**
   * Creates a new user based on the provided CreateUserDto.
   * 
   * @param crtUsrDto The data transfer object containing user creation details.
   * @returns The newly created user.
   */
  async create(crtUsrDto: CreateUserDto) {
    try {
      return await this.usrMd.create({ ...crtUsrDto, password: bcrypt.hashSync(crtUsrDto.password, 10) })
    } catch (error: any) {
      if (error.code === 11000) throw new BadRequestException(`Este nombre de usuario ya está registrado.`)
    }
  }

  /**
   * Finds all users except the specified user.
   * 
   * @param usr - The user to exclude from the results.
   * @returns {Promise<any[]>} - A promise that resolves to an array of users.
   */
  async findAll(usr: any) {
    const lst = await this.usrMd.find()
    return lst.filter((i: any) => String(i._id) !== String(usr._id))
  }

  /**
   * Retrieves a specific user based on the provided ID.
   * 
   * @param id The unique identifier of the user to be retrieved.
   * @returns The user with the specified ID.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  async findOne(id: string) {
    const usr: User = await this.usrMd.findById(id);
    if (!usr) throw new NotFoundException(`User with id "${id}" not found`);
    return usr;
  }

  /**
   * Updates a user's information based on the provided ID and UpdateUserDto.
   * 
   * @param id The unique identifier of the user to be updated.
   * @param updUsrDto The data transfer object containing updated user details.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  async update(id: string, updUsrDto: UpdateUserDto) {
    const { matchedCount } = await this.usrMd.updateOne({ _id: new Types.ObjectId(id) }, updUsrDto, { new: true });
    if (matchedCount === 0) throw new NotFoundException(`User with id "${id}" not found`);
  }

  /**
   * Removes a user from the database based on the provided ID.
   * 
   * @param id The unique identifier of the user to be removed.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  async remove(id: string) {
    const { deletedCount } = await this.usrMd.deleteOne({ _id: new Types.ObjectId(id) });
    if (deletedCount === 0) throw new NotFoundException(`User with id "${id}" not found`);
  }

}