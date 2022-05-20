import axios from 'axios'
import { api_url } from "../utils";

const getAll = async () => {
  const response = await axios.get(api_url.concept.getAll)
  return response.data
}

const add = async (concept: any) => {
  const response = await axios.post(api_url.concept.add, concept)
  return response.data
}

const update = async (id: any) => {
}


const remove = async (id: any) => {
}

export const conceptService = {getAll, add, update, remove}
