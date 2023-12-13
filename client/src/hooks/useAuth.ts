import { useUser } from "@/store/user"

export default function useAuth() {
  const user = useUser()
  const onRegistration = async () => {
    const registr = {
      email: emailReg.value,
      password: passwordReg.value,
      username: username.value
    }
    await user.userRegistration(registr)
    router.push(HOME_ROUTE)
    emailReg.value = ''
    passwordReg.value = ''
    username.value = ''
  }
  const onAuth = async () => {
    const auth = {
      email: emailAuth.value,
      password: passwordAuth.value,
    }
    await user.userLogin(auth)
    router.push(HOME_ROUTE)
    emailAuth.value = ''
    passwordAuth.value = ''
  }
  return {
    onAuth, onRegistration
  }  
}