import express from 'express';
import cors from 'cors';

import { dbinit } from './utils/dbinit';
import { router as postRouter } from './routers/post';
import { router as commentRouter } from './routers/comment';

const PORT = process.env.PORT || 5000;
const app = express();

dbinit();

app.use(cors());
app.use(express.json());
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
