import * as migration_20260930_012242_initial from './20260930_012242_initial';

export const migrations = [
  {
    up: migration_20260930_012242_initial.up,
    down: migration_20260930_012242_initial.down,
    name: '20260930_012242_initial'
  },
];
