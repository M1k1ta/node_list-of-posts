import { Comment } from '../models/Comment';
import { NewComment } from '../types/NewComment';

export const findAllByPostId = async(postId: number) => {
  return await Comment.findAll({
    where: {
      postId,
    }
  });
};

export const create = async({ name, email, message, postId }: NewComment) => {
  return await Comment.create({ name, email, message, postId });
};

export const remove = async(id: number) => {
  return await Comment.destroy({
    where: {
      id,
    }
  });
};

export const removeAll = async(postId: number) => {
  return await Comment.destroy({
    where: {
      postId,
    }
  });
};
