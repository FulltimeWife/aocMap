import axios from "axios";

const API_URL = '/api/map/:id'

const getZone = async() => {
  const response = await axios.get(API_URL)
  if(response.data) {
    localStorage.setItem('zone', JSON.stringify(response.data))
  }
  return response.data
}

const zoneService = {
  getZone
}

export default zoneService