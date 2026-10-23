import * as migration_20260930_012242_initial from './20260930_012242_initial';
import * as migration_20261023_071339_topic_and_infusion_pages from './20261023_071339_topic_and_infusion_pages';
import * as migration_20261023_075201_two_factor from './20261023_075201_two_factor';

export const migrations = [
  {
    up: migration_20260930_012242_initial.up,
    down: migration_20260930_012242_initial.down,
    name: '20260930_012242_initial',
  },
  {
    up: migration_20261023_071339_topic_and_infusion_pages.up,
    down: migration_20261023_071339_topic_and_infusion_pages.down,
    name: '20261023_071339_topic_and_infusion_pages',
  },
  {
    up: migration_20261023_075201_two_factor.up,
    down: migration_20261023_075201_two_factor.down,
    name: '20261023_075201_two_factor'
  },
];
