import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core'
import compression from 'compression'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression())
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe())
  
  const { PORT, HOST } = process.env
  
  await app.listen(PORT, HOST);
}
bootstrap();
