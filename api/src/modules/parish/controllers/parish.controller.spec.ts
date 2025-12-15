import { Test, TestingModule } from '@nestjs/testing';
import { ParishController } from './parish.controller';
import { ParishService } from './services/parish.service';

describe('ParishController', () => {
  let controller: ParishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParishController],
      providers: [ParishService],
    }).compile();

    controller = module.get<ParishController>(ParishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
