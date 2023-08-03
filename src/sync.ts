import { Post } from './models/Post';
import { Comment } from './models/Comment';
import { dbinit } from './utils/dbinit';

export const seedInitialData = async() => {
  await Post.bulkCreate([]);
  await Comment.bulkCreate([]);
};

const sync = async() => {
  dbinit();
  // { force: true }
  await Post.sync({ force: true });
  await Comment.sync({ force: true });

  await seedInitialData();
};

sync();
