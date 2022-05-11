import axios from 'axios'

const API_URL = '/api/map/'

const getAll = async() => {
  const response = await axios.get(API_URL)
  if(response.data) {
    localStorage.setItem('markers', JSON.stringify(response.data))
  }
  return response.data
}

const sendAll = async(newMarkers) => {
  const response = await axios.post(API_URL, newMarkers)

  if(response.data) {
    console.log(response.data)
  }
  return response.data
}


const markerService = {
  getAll,
  sendAll
}

export default markerService