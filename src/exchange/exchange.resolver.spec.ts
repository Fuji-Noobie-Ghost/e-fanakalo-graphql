import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeResolver } from './exchange.resolver';
import { ExchangeService } from './exchange.service';

describe('ExchangeResolver', () => {
  let resolver: ExchangeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeResolver, ExchangeService],
    }).compile();

    resolver = module.get<ExchangeResolver>(ExchangeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
