import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeResolver } from './exchange.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exchange, Photo } from 'src/database';

@Module({
  imports: [TypeOrmModule.forFeature([Exchange, Photo])],
  providers: [ExchangeResolver, ExchangeService]
})
export class ExchangeModule {}
