import express, { Application } from 'express';
import {config} from 'dotenv';
import router from './routes/router';
import sequelize from './db/postgres';
import errorHandling from './middlewares/errorMiddleware'
import {json, urlencoded} from 'body-parser';
import {resolve} from 'path';
import fileUpload from 'express-fileupload';
import cors from 'cors'
import {Server,Socket} from 'socket.io'
import {createServer} from 'http'
import { defineAssociations } from './models/assosiations';
config()

const app: Application = express();
const port = process.env.PORT || 5000;
const server = createServer(app);
const io = new Server(server);

app.use(cors({
  origin: 'http://localhost:5173',
}))
app.use(express.static(resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use("/api", router);
app.use(errorHandling);

io.on('connection', (socket) => {
  socket.on('join room', (roomId) => {
    socket.join(roomId);
    
    socket.on('disconnect', () => {
      console.log(`User disconnected from room ${roomId}`);
    });

    socket.on('message', (msg) => {
      io.to(roomId).emit('message', msg);
    });
  });
});

app.set('socketio', io);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    defineAssociations();
    server.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();