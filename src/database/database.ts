import { DataSource } from 'typeorm';
import { UserEntity } from './models';

import * as SQLite from 'expo-sqlite/legacy';

export const source = new DataSource({
  database: 'finance.db',
  type: 'expo',
  driver: SQLite,
  entities: [UserEntity],
  synchronize: true,
});
