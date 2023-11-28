import { Test, TestingModule } from '@nestjs/testing';
import { ElectoralCentersController } from './electoral-centers.controller';
import { ElectoralCentersService } from '../../services/electoral-centers/electoral-centers.service';

describe('ElectoralCentersController', () => {
  let controller: ElectoralCentersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectoralCentersController],
      providers: [ElectoralCentersService],
    }).compile();

    controller = module.get<ElectoralCentersController>(ElectoralCentersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
