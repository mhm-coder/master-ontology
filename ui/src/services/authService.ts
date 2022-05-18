import axios from 'axios'
import { api_url } from "../utils";

const register = async (userData: any) => {
  const response = await axios.post(api_url.user.register, userData)
  response.data && localStorage.setItem('user', JSON.stringify(response.data))
  return response.data
}

const login = async (userData: any) => {
  const response = await axios.post(api_url.user.login, userData)
  response.data && localStorage.setItem('user', JSON.stringify(response.data))
  return response.data
}

const logout = () => localStorage.removeItem('user')

export const authService = {register, logout, login}
