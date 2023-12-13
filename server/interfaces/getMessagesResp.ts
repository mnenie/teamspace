import { IRoom } from "./Room";
import { IMessage } from "./Message";

export interface IGetMessages {
  room: IRoom;
  messages: (IMessage & { User: user })[];
}

interface user{
    id :number;
    username :string;
}