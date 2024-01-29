import { Test, TestingModule } from '@nestjs/testing';
import { ElectoralCentersController } from './electoral-centers.controller';
import { ElectoralCentersService } from '../../services/electoral-centers/electoral-centers.service';
  
describe('Electoral Centers Controller', () => {
  
  let controller: ElectoralCentersController
  let service: ElectoralCentersService
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectoralCentersController],
      providers: [ElectoralCentersService]
    }).compile();

    controller = module.get<ElectoralCentersController>(ElectoralCentersController);
    service = module.get<ElectoralCentersService>(ElectoralCentersService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
});