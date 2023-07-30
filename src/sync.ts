import { Bridge } from './models/Bridge';
import { Room } from './models/Room';
import { User } from './models/User';
import { dbinit } from './utils/dbinit';

export const seedInitialData = async() => {
  await User.bulkCreate([]);
  await Room.bulkCreate([]);
  await Bridge.bulkCreate([]);
};

const sync = async() => {
  dbinit();
  // { force: true }
  await User.sync({ force: true });
  await Room.sync({ force: true });
  await Bridge.sync({ force: true });

  await seedInitialData();
};

sync();