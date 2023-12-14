import BoardService from '@/services/BoardService'
import type { IBoard } from '@/types/Board'
import type { IColumn } from '@/types/Column'
import type { ITask } from '@/types/Task'
import { TaskStatus } from '@/types/consts'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBoard = defineStore('board', () => {
  const boards = ref<IBoard[]>([])
  const boardInfo = ref({} as IBoard)
  const column = ref({} as IColumn)
  const columns = ref<
    {
      column: IColumn
      tasks: ITask[]
    }[]
  >([])

  const addBoard = async (boardNewInfo: IBoard) => {
    try {
      const response = await BoardService.createBoard(boardNewInfo)
      boardInfo.value = response.data
      boards.value.push(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const addColumn = async (columnInfo: IColumn) => {
    try {
      const response = await BoardService.createColumn(columnInfo)
      column.value = response.data
      columns.value.push({ column: response.data, tasks: [] })
    } catch (error) {
      console.log(error)
    }
  }

  const getTasksByBoard = async (boardId: number) => {
    try {
      const response = await BoardService.getTasksByBoard(boardId)

      columns.value = response.data.info
      boardInfo.value = response.data.board
    } catch (error) {
      console.log(error)
      columns.value = []
    }
  }

  const getBoardsByProject = async (projectId: number) => {
    try {
      const response = await BoardService.getAllBoards(projectId)
      boardInfo.value = response.data[0]
      boards.value = response.data
    } catch (err) {
      console.log(err)
    }
  }

  //unused
  const getAllBoards = async (projectId: number) => {
    const response = await BoardService.getAllBoards(projectId)
    boards.value = response.data
  }

  const createTask = async (taskInfo: ITask, column: IColumn) => {
    const response = await BoardService.createTask(taskInfo)
    for (let index = 0; index < columns.value.length; index++) {
      if (columns.value[index].column === column) {
        columns.value[index].tasks.push(response.data)
      }
    }
  }

  const deleteBoard = async (boardId: number) => {
    try {
      const response = await BoardService.deleteBoard(boardId)
      boards.value = boards.value.filter((elem) => elem.id !== boardId)
    } catch (e) {
      console.log(e)
    }
  }

  const completeTask = async (taskId: number, memberId : number) => {
    try {
      const response = await BoardService.completeTask(taskId, memberId);
      for (let index = 0; index < columns.value.length; index++) {
        const tasks = columns.value[index].tasks;
        for (let index = 0; index < tasks.length; index++) {
          if (tasks[index].id === taskId) {
            tasks[index].state = TaskStatus.Completed;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addBoard,
    addColumn,
    getTasksByBoard,
    columns,
    boards,
    getBoardsByProject,
    boardInfo,
    getAllBoards,
    createTask,
    deleteBoard,
    completeTask
  }
})
