import express from 'express';
import cors from 'cors';

import { User } from './models/User';
import { dbinit } from './utils/dbinit';
import { router as authRouter } from './routers/auth';
import { router as usersRouter } from './routers/users';

const PORT = process.env.PORT || 5000;
const app = express();

dbinit();

app.use(cors());
app.use(express.json());
app.use('/', authRouter);
app.use('/users', usersRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
