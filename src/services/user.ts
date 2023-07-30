import { Op } from "sequelize";
import { Bridge } from "../models/Bridge";
import { User } from "../models/User";

export const findUsersByRoom = async (roomId: number) => {
  const bridges = await Bridge.findAll({
    where: {
      roomId,
    }
  });

  const emails = bridges.map(({ email }) => email);

  const users = await User.findAll({
    where: {
      email: {
        [Op.or]: emails,
      }
    },
    order: [
      ['updatedAt', 'DESC'],
    ],
  });

  return users;
}