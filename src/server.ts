import express from 'express';
import cors from 'cors';

import { dbinit } from './utils/dbinit';
import { router as authRouter } from './routers/auth';
import { router as usersRouter } from './routers/users';
import { router as roomRouter } from './routers/room';
import { Room } from './models/Room';

const PORT = process.env.PORT || 5000;
const app = express();

dbinit();

app.use(cors());
app.use(express.json());
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/room', roomRouter);
app.get('/check', async (req, res) => {
  try {
    await Room.findAll();

    res.send({ status: 'Ok' });
  } catch {
    res.send({ status: 'Fail' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
