import BoardService from "@/services/BoardService";
import type { IBoard } from "@/types/Board";
import type { IColumn } from "@/types/Column";
import type { ITask } from "@/types/Task";
import { ClockIcon } from "@heroicons/vue/20/solid";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBoard = defineStore('board', () => {
  const boards = ref<IBoard[]>([])
  const boardInfo = ref({} as IBoard)
  const column = ref({} as IColumn)
  const tasks = ref<ITask[]>([])
  const columns = ref<IColumn[]>([])
  
  const addBoard = async (boardNewInfo: IBoard) => {
    try{  
      const response = await BoardService.createBoard(boardNewInfo)
      console.log(response.data);
      boardInfo.value = response.data
      boards.value.push(response.data)
    } catch(e){
      console.log(e)
    }
  }

  const addColumn = async (columnInfo: IColumn) => { 
    try{
      const response = await BoardService.createColumn(columnInfo)
      column.value = response.data
      columns.value.push(response.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const getTasksByBoard = async (boardId: number) : Promise<IColumn[]> => {
    try {
      const response = await BoardService.getTasksByBoard(boardId);
      const newColumns = [] as IColumn[];
      const newTasks = [] as ITask[];
  
      response.data.forEach(boardData => {
        newColumns.push(boardData.column);
        newTasks.push(...boardData.tasks);
      });

      columns.value = newColumns;
      tasks.value = newTasks;
    } catch (error) {
      console.log(error);
      return [] as IColumn[];
    }
  };


  const getBoardsByProject = async (projectId: number) => {
    try{
      const response = await BoardService.getAllBoards(projectId)
      console.log(response.data)
      boardInfo.value = response.data[0]
      boards.value = response.data
    }
    catch(err){
      console.log(err);
    }
  }

  const getAllBoards = async(projectId: number) => {
    const response = await BoardService.getAllBoards(projectId)
    boards.value = response.data
  }

  return {
    addBoard, addColumn, getTasksByBoard, columns, tasks, boards, getBoardsByProject, boardInfo, getAllBoards
  }
})