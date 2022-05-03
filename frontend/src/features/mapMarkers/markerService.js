import axios from 'axios'

const API_URL = '/api/map/'

const getAll = async() => {
  const response = await axios.get(API_URL)
  if(response.data) {
    localStorage.setItem('markers', JSON.stringify(response.data))
  }
  return response.data
}


const markerService = {
  getAll
}

export default markerService