import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Voter } from 'src/entities/voter.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/entities/user.entity';

@Injectable()
export class VotersService {

  constructor(
    @InjectModel(Voter.name) private readonly vtMd: Model<Voter>
  ) { }

  /**
   * Creates a new voter based on the provided data.
   * 
   * @param crtVtDto - Data for creating a new voter.
   * @returns The newly created voter.
   */
  async create(crtVtDto: any) {
    try {
      return await this.vtMd.create(crtVtDto)
    } catch (error) {
      if (error.code === 11000) throw new BadRequestException(`Ya existe un votante con este número de cédula.`)
    }
  }

  /**
   * Finds all records in the database based on the provided electoral center ID and user information.
   *
   * @param ecid - Electoral center ID for filtering records.
   * @param usr - User object containing information like role and user ID for additional filtering.
   * @returns An array of aggregated records with selected fields.
   */
  async findAll(ecid: string, usr: User, uid: string) {
    const match: any = { ecid: new Types.ObjectId(ecid) }
    if (usr.role === "user") match.uid = usr._id
    if (uid) match.uid = new Types.ObjectId(uid)
    return await this.vtMd.aggregate([{
      $match: match
    }, {
      $lookup: {
        "from": "electoral-centers",
        "localField": "ecid",
        "foreignField": "_id",
        "as": "ecid"
      }
    }, {
      $unwind: "$ecid"
    }, {
      $project: {
        full_name: "$full_name",
        identification_card: "$identification_card",
        address: "$address",
        phone: "$phone",
        code: "$ecid.code"
      }
    }])
  }

  /**
   * Retrieves the total count of electoral centers and enclosures based on the provided user ID and role.
   * 
   * @param uid The user ID.
   * @param role The role of the user ('user' or any other role).
   * @returns A Promise that resolves to an array containing aggregated data on electoral centers and enclosures.
   */
  async findTotal(uid: string, role: string) {
    const match = (role === "user") ? { uid: new Types.ObjectId(uid) } : {}
    return await this.vtMd.aggregate([
      {
        $match: match
      }, {
        $lookup: {
          "from": "electoral-centers",
          "localField": "ecid",
          "foreignField": "_id",
          "as": "electoral_centers"
        }
      }, {
        $unwind: "$electoral_centers"
      }, {
        $project: {
          ecid: "$ecid",
          code: "$electoral_centers.code",
          eid: "$electoral_centers.eid"
        }
      },
      {
        $lookup: {
          "from": "enclosures",
          "localField": "eid",
          "foreignField": "_id",
          "as": "enclosures"
        }
      }, {
        $unwind: "$enclosures"
      }, {
        $project: {
          ecid: "$ecid",
          code: "$code",
          description: "$enclosures.description"
        }
      },
      {
        $group: {
          _id: "$code",
          ecid: { $first: "$ecid" },
          code: { $first: "$code" },
          description: { $first: "$description" },
          count: { $sum: 1 }
        }
      }, {
        $sort: { code: 1 }
      }
    ])
  }

  /**
   * Retrieves the total count of records aggregated by electoral center code for a given user.
   * 
   * @param uid - User ID
   * @returns {Promise<Array>} - A Promise that resolves to an array containing aggregated data.
   */
  async findTotalByUsr(uid: string) {
    return await this.vtMd.aggregate([
      {
        $match: { uid: new Types.ObjectId(uid) }
      }, {
        $lookup: {
          "from": "electoral-centers",
          "localField": "ecid",
          "foreignField": "_id",
          "as": "electoral_centers"
        }
      }, {
        $unwind: "$electoral_centers"
      }, {
        $project: {
          ecid: "$ecid",
          code: "$electoral_centers.code",
          eid: "$electoral_centers.eid"
        }
      },
      {
        $lookup: {
          "from": "enclosures",
          "localField": "eid",
          "foreignField": "_id",
          "as": "enclosures"
        }
      }, {
        $unwind: "$enclosures"
      }, {
        $project: {
          ecid: "$ecid",
          code: "$code",
          description: "$enclosures.description"
        }
      },
      {
        $group: {
          _id: "$code",
          ecid: { $first: "$ecid" },
          code: { $first: "$code" },
          description: { $first: "$description" },
          count: { $sum: 1 }
        }
      }, {
        $sort: { code: 1 }
      }
    ])
  }

  /**
   * Finds a voter by its unique identifier (ID).
   * 
   * @param id - Unique identifier of the voter to be found.
   * @returns The voter with the specified ID.
   * @throws NotFoundException if no voter is found with the given ID.
   */
  async findOne(id: string) {
    const vt: Voter = await this.vtMd.findById(id);
    if (!vt) throw new NotFoundException(`Voter with id "${id}" not found`)
    return vt;
  }

  /**
   * Updates a voter with the provided ID using the given voter data.
   * 
   * @param id - Unique identifier of the voter to be updated.
   * @param updVtDto - Data for updating the voter.
   * @throws NotFoundException if no voter is found with the given ID.
   */
  async update(id: string, updVtDto: any) {
    const { matchedCount } = await this.vtMd.updateOne({ _id: new Types.ObjectId(id) }, {
      ...updVtDto,
      ecid: new Types.ObjectId(updVtDto.ecid)
    }, { new: true });
    if (matchedCount === 0) throw new NotFoundException(`Voter with id "${id}" not found`)
  }

  /**
   * Removes a voter with the provided ID.
   * 
   * @param id - Unique identifier of the voter to be removed.
   * @throws NotFoundException if no voter is found with the given ID.
   */
  async remove(id: string) {
    const { deletedCount } = await this.vtMd.deleteOne({ _id: new Types.ObjectId(id) })
    if (deletedCount === 0) throw new NotFoundException(`Voter with id "${id}" not found`)
  }

  /**
   * Removes all documents associated with a specific user ID from the database.
   * 
   * @param uid The user ID for which associated documents will be removed.
   */
  async removeByUser(uid: any) {
    await this.vtMd.deleteMany({ uid: new Types.ObjectId(uid) })
  }

}