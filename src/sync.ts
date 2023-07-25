import { User } from './models/User';
import { dbinit } from './utils/dbinit';

export const seedInitialData = async() => {
  await User.bulkCreate([]);
};

const sync = async() => {
  dbinit();
  // { force: true }
  await User.sync({ force: true });

  await seedInitialData();
};

sync();