import axios from 'axios'

const BASE_MAIN_URL = 'https://api-football-v1.p.rapidapi.com/v3/'

const HEADER_PARAMS = {
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    'x-rapidapi-key': '6c434e3f14msh2e55f68401a5e16p1cedfdjsn964a1b848265'
}

const mainAPI = axios.create({
  baseURL: BASE_MAIN_URL,
  headers: HEADER_PARAMS
})

export {
  mainAPI,
}