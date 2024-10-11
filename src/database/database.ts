import { DataSource } from 'typeorm';
import { UserEntity } from './models';

export const source = new DataSource({
  database: 'finance.db',
  type: 'expo',
  driver: require('expo-sqlite'),
  entities: [UserEntity],
  synchronize: true,
});
