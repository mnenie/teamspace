import BoardService from "@/services/BoardService";
import type { IBoard } from "@/types/Board";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBoad = defineStore('board', () => {
  const boardInfo = ref({} as IBoard)

  const addBoard = async () => {
    try{  
      const response = await BoardService.createBoard(boardInfo.value)
      boardInfo.value = response.data
    } catch(e){
      console.log(e)
    }
  }

  return addBoard
})