import UserService from '@/services/UserService'
import { defineStore } from 'pinia'
import type { IUser } from '@/types/User'
import { ref } from 'vue'

export const useUser = defineStore('user', () => {
  const user = ref({} as IUser)
  const userRegistration = async (userReg: IUser) => {
    const response = await UserService.registration(userReg)
  }
})
