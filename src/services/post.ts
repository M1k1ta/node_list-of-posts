import { Post } from '../models/Post';
import { NewPost } from '../types/NewPost';
import { PostData } from '../types/PostData';

export const findAll = async() => {
  return await Post.findAll();
};

export const create = async({ title, body }: NewPost) => {
  return await Post.create({ title, body });
};

export const update = async({ id, title, body }: PostData) => {
  return await Post.update({ title, body }, {
    where: { id }
  });
};

export const remove = async(id: number) => {
  return await Post.destroy({
    where: {
      id,
    }
  });
};
