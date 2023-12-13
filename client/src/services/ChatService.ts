import type { AxiosResponse } from "axios";
import $api from "@/api/index";
import type { IRoom } from "@/types/Room";
import type { IMessage } from "@/types/Message";
import type {IGetMessages} from "@/types/getMessagesResp";
/**
 * Service class for managing chat functionality.
 */
export default class ChatService {
    
    /**
     * Creates a new chat room.
     * @param room - The details of the room to be created.
     * @returns A Promise resolving to the AxiosResponse containing the created chat room.
     */
    static async createRoom(room: IRoom): Promise<AxiosResponse<IRoom>> {
        const resp = await $api.post("/chat/room", room);
        return resp;
    }

    /**
     * Deletes a chat room by its ID.
     * @param id - The ID of the room to be deleted.
     * @returns A Promise resolving to the AxiosResponse indicating the success of the deletion.
     */
    static async deleteRoom(id: number | string): Promise<AxiosResponse<void>> {
        const resp = await $api.delete("/chat/room/" + id);
        return resp;
    }

     /**
     * Retrieves a chat room by its ID.
     * @param id - The ID of the project.
     * @returns A Promise resolving to the AxiosResponse containing the rooms from the project.
     */
     static async getRoomsByProjectId(id: number | string): Promise<AxiosResponse<IRoom[]>> {
        const resp = await $api.get("/chat/rooms/" + id);
        return resp;
    }

    /**
     * Sends a message to a chat room.
     * @param msg - The message to be sent.
     * @returns A Promise resolving to the AxiosResponse containing the sended message.
     */
    static async sendMessage(msg: IMessage): Promise<AxiosResponse<IMessage>> {
        const resp = await $api.post("/chat/message/", msg);
        return resp;
    }

    /**
     * Retrieves all messages from a chat room by its ID.
     * @param roomId - The ID of the chat room.
     * @returns A Promise resolving to the AxiosResponse containing the messages from the chat room and room data.
     */
    static async getMessagesByRoom(roomId: string | number): Promise<AxiosResponse<IGetMessages>> {
        const resp = await $api.get("/chat/message/" + roomId);
        return resp;
    }
}
