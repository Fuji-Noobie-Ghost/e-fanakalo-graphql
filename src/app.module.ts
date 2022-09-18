import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { altairExpress } from 'altair-express-middleware'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
import { join } from 'path'
import { createDataSourceOptions } from './database'
import { ExchangeModule } from './exchange/exchange.module';
import express from 'express'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(createDataSourceOptions(join(__dirname, 'database'))),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    ExchangeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress({
      maxFileSize: 1024 * 1024 * (+process.env.MAX_FILE_SIZE),
      maxFiles: +process.env.MAX_FILE_COUNT + 4
    })).forRoutes('graphql')

    consumer.apply(express.static(join(__dirname, '../uploads'))).forRoutes('/uploads')

    consumer.apply(altairExpress({
      endpointURL: '/graphql'
    })).forRoutes('/altair')
  }
}
