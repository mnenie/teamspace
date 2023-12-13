import UserService from '@/services/UserService'
import { defineStore } from 'pinia'
import type { IUser } from '@/types/User'
import { ref } from 'vue'

export const useUser = defineStore('user', () => {
  const user = ref({} as IUser)
  const isAuth = ref<boolean>(false)
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
      console.log(response.data, 'reg')
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
      console.log(response.data, 'login')
    } catch (err) {
      console.error(err)
    }
  }

  return {
    userRegistration, userLogin
  }
})
