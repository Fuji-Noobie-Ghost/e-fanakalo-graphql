import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import { config } from '../../node_modules/dotenv/lib/main'

if (!process.env.NODE_ENV) config()

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, NODE_ENV } = process.env

export function createDataSourceOptions(rootDir: string): DataSourceOptions {
    return {
        type: 'postgres',
        host: DB_HOST,
        port: +DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        synchronize: false,
        logging: NODE_ENV === 'development',
        entities: [rootDir + '/entities/**/*{.js,.ts}'],
        migrations: [rootDir + '/migrations/**/*{.js,.ts}'],
        subscribers: [rootDir + '/subscribers/**/*{.js,.ts}']
    }
}

export const AppDataSource = new DataSource(createDataSourceOptions(__dirname))