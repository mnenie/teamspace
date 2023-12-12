import BoardService from '@/services/BoardService'
import type { IBoard } from '@/types/Board'
import type { IColumn } from '@/types/Column'
import type { ITask } from '@/types/Task'
import { ClockIcon } from '@heroicons/vue/20/solid'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBoard = defineStore('board', () => {
  const boards = ref<IBoard[]>([])
  const boardInfo = ref({} as IBoard)
  const column = ref({} as IColumn)
  const tasks = ref<ITask[]>([])
  const columns = ref<IColumn[]>([])

  const addBoard = async () => {
    try {
      const response = await BoardService.createBoard(boardInfo.value)
      boardInfo.value = response.data
    } catch (e) {
      console.log(e)
    }
  }

  const addColumn = async (columnInfo: IColumn) => {
    try {
      const response = await BoardService.createColumn(columnInfo)
      column.value = response.data
      // columns.value.push(columnInfo)
    } catch (error) {
      console.log(error)
    }
  }

  const getTasksByBoard = async (boardId: number) => {
    try {
      const response = await BoardService.getTasksByBoard(boardId)
      response.data.map((boardData) => {
        columns.value.push(boardData.column)
        tasks.value = tasks.value.concat(boardData.tasks)
      })
    } catch (error) {
      console.log(error)
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
  return {
    addBoard,
    addColumn,
    getTasksByBoard,
    columns,
    tasks,
    boards,
    getBoardsByProject,
    boardInfo
  }
})
