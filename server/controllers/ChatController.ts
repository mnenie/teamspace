import { Server, Socket } from 'socket.io';

class ChatController {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public handleConnection(socket: Socket): void {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg: string) => {
      this.io.emit('chat message', msg);
    });
  }
}

export default ChatController;
