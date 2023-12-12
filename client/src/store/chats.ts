import BoardService from "@/services/BoardService";
import ChatService from "@/services/ChatService";
import type { IRoom } from "@/types/Room";
import { defineStore } from "pinia";
import { ref } from "vue";
import type {IMessage} from "@/types/Message"

export const useChat = defineStore('chat', () => {
    const chats = ref<IRoom[]>([])
    const chatInfo = ref<{ room: IRoom, messages: IMessage[]}>({} as { room: IRoom, messages: IMessage[]})
  
    const addChat = async ( room :IRoom) => {
        try{  
            const response = await ChatService.createRoom(room)
            chats.value.push(response.data)
        } catch(e){
          console.log(e)
        }
    }

    const getChats = async (id : number) =>{
        try{  
            const response = await ChatService.getRoomsByProjectId(id)
            chats.value = response.data;
        } catch(e){
          console.log(e)
        }
    }

    const getChatInfo =  async (chatId : number) => {
        try{  
            const response = await ChatService.getMessagesByRoom(chatId)
            chatInfo.value = response.data;
        } catch(e){
          console.log(e)
        }
    }


    return {
    chats,chatInfo, getChats,addChat,getChatInfo
}
})