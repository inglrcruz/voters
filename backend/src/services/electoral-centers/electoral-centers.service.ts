import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ElectoralCenter } from 'src/entities/electoral-center.entity';

@Injectable()
export class ElectoralCentersService {

  constructor(
    @InjectModel(ElectoralCenter.name) private readonly ecCtMd: Model<ElectoralCenter>
  ) { }

  /**
   * Retrieves and sorts records by 'code' field, including 'description' from linked 'enclosures'.
   * Uses aggregation with $lookup for a left outer join.
   * 
   * @returns {Promise<Array>} Aggregated results.
   */
  async findAll() {
    return await this.ecCtMd.aggregate([
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
          code: "$code",
          description: "$enclosures.description"
        }
      }, {
        $sort: { code: 1 }
      }
    ])
  }

}
