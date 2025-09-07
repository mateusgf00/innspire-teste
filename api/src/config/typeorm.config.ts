import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';

config();

const configService = new ConfigService();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST') || process.env.DB_HOST || 'localhost',
  port: parseInt(configService.get('DB_PORT') || process.env.DB_PORT || '5432'),
  username: configService.get('DB_USERNAME') || process.env.DB_USERNAME || 'postgres',
  password: configService.get('DB_PASSWORD') || process.env.DB_PASSWORD || 'postgres',
  database: configService.get('DB_NAME') || process.env.DB_NAME || 'heroforce',
  entities: [User, Project],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: (configService.get('NODE_ENV') || process.env.NODE_ENV) === 'development',
  ssl: (configService.get('NODE_ENV') || process.env.NODE_ENV) === 'production' ? { rejectUnauthorized: false } : false,
};

export const AppDataSource = new DataSource(typeOrmConfig);