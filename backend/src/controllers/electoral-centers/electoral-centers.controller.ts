import { Controller, Get } from '@nestjs/common';
import { ElectoralCentersService } from '../../services/electoral-centers/electoral-centers.service';
import { Auth } from 'src/decorators';

@Auth()
@Controller('electoral-center')
export class ElectoralCentersController {

  constructor(private readonly elcCtServ: ElectoralCentersService) { }

  /**
   * Retrieves a list of items.
   *
   * @returns A list of items obtained using the findAll method of the elcCtServ service.
   */
  @Get("list")
  findAll() {
    return this.elcCtServ.findAll();
  }

}
