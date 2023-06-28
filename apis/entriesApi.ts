import axios from "axios";


const entriesApi = axios.create({
  baseURL: '/api' // permite que el base url sea localhoost/300/api
})

export default entriesApi