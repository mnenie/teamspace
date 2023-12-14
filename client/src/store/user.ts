import UserService from '@/services/UserService'
import { defineStore } from 'pinia'
import type { IUser } from '@/types/User'
import { ref } from 'vue'
import { useProject } from './project'
import type { IProject } from '@/types/Project'
import { useBoard } from './board'
import type { IBoard } from '@/types/Board'

export const useUser = defineStore('user', () => {
  const user = ref({} as IUser)
  const isAuth = ref<boolean>(false)
  const project = useProject()
  const board = useBoard()
  const setAuth = (bool: boolean) => {
    isAuth.value = bool
  }
  const setUser = (u: IUser) => {
    user.value = u
  }

  const userRegistration = async (userReg: IUser) => {
    try {
      const response = await UserService.registration(userReg)
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
      setAuth(true)
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (err) {
      console.log(err)
    }
  }

  const userLogin = async (loginData: { email: string, password: string }) => {
    try {
      const response = await UserService.login(loginData)
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
      setAuth(true)
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (err) {
      console.error(err)
    }
  }

  const userLogout = async () => {
    const response = UserService.logout()
    localStorage.removeItem('user')
    localStorage.removeItem('selectedProject')
    setAuth(false)
    user.value = {} as IUser
    project.projects = []
    project.project = {} as IProject
    board.boards = []
    board.boardInfo = {} as IBoard
    board.columns = []

    return response
  }

  const checkAuth = async () => {
    const ls = localStorage.getItem('user');
    if (!user.value && ls){
      user.value = JSON.parse(ls) as IUser;
    }
  }
  

  return {
    userRegistration, userLogin, user, isAuth, userLogout,checkAuth
  }
})
