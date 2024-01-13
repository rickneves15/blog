import axios from 'axios'

const BASE_URL = process.env.API_BASE_URL
console.log(BASE_URL)

if (!BASE_URL) {
  throw Error('Invalid api base URL.')
}

export const api = axios.create({
  baseURL: BASE_URL,
})
