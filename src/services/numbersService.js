import axios from 'axios'
const baseUrl = '/api/persons'

const getAllPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createPerson = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const updatePerson = (id, updateTargetObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updateTargetObject)
  return request.then(response => response.data)
}

export default { getAllPersons, createPerson, deletePerson, updatePerson }