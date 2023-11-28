import { Test, TestingModule } from '@nestjs/testing';
import { ElectoralCentersService } from './electoral-centers.service';

describe('ElectoralCentersService', () => {
  let service: ElectoralCentersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectoralCentersService],
    }).compile();

    service = module.get<ElectoralCentersService>(ElectoralCentersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
