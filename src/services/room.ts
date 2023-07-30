import { Op } from "sequelize";
import { Bridge } from "../models/Bridge";
import { Room } from "../models/Room"
import { NewRoom } from "../types/NewRoom";
import { UserAddData } from "../types/UserAddData";

export const findRoomById = async(email: string, roomId: number) => {
  const bridge = await Bridge.findAll({
    where: {
      [Op.and]: [
        {
          email: {
            [Op.in]: [email],
          }
        },
        {
          roomId: {
            [Op.in]: [roomId],
          }
        },
      ],
    }
  });

  if (bridge.length === 0) {
    return { errors: { status: "Don't have rools" }};
  }

  return await Room.findByPk(roomId);
}

export const findRoomsByUser = async (email: string) => {
  const bridges = await Bridge.findAll({
    where: {
      email: email.slice(1),
    }
  });

  const roomsIds = bridges.map(({ roomId }) => roomId);

  const rooms = await Room.findAll({
    where: {
      id: {
        [Op.in]: roomsIds,
      },
    },
    order: [
      ['createdAt', 'DESC'],
    ],
  });

  return rooms;
}

export const createRoom = async ({ name, autorEmail }: NewRoom) => {
  const room = await Room.create({ name, autorEmail });
  await Bridge.create({ email: autorEmail, roomId: room.id });
  return room;
};

export const addUser = async ({ email, roomId }: UserAddData) => {
  const bridge = await Bridge.findAll({
    where: {
      [Op.and]: [
        {
          email: {
            [Op.in]: [email],
          }
        },
        {
          roomId: {
            [Op.in]: [roomId],
          }
        },
      ],
    }
  });

  if (bridge.length !== 0) {
    return { status: 'NOT' };
  }

  await Bridge.create({ email, roomId });
  await Room.update({ updatedAt: Date.now() }, {
    where: {
      id: roomId,
    },
  });
};

export const removeUser = async (email: string, roomId: number) => {
  await Bridge.destroy({
    where: {
      [Op.and]: [
        {
          email: {
            [Op.in]: [email],
          }
        },
        {
          roomId: {
            [Op.in]: [roomId],
          }
        },
      ],
    }
  });
};

export const removeRoom = async (roomId: number) => {
  try {
    await Room.destroy({
      where: {
        id: roomId,
      }
    });
  } catch {
    return { errors: { status: 'Fail' }};
  }


  await Bridge.destroy({
    where: {
      roomId,
    }
  })
}
