import axios from 'axios'

const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit'

export function signUp(data) {
  return axios.post(`${BASE_URL}/auth/sign-up`, data)
}

export function login(data) {
  return axios.post(`${BASE_URL}/auth/login`, data)
}

export function getHabits(token) {
  return axios.get(`${BASE_URL}/habits`, config(token))
}

export function createHabit(data, token) {
  return axios.post(`${BASE_URL}/habits`, data, config(token))
}

export function getTodayHabits(token) {
  return axios.get(`${BASE_URL}/habits/today`, config(token))
}

export function checkHabit(id, token) {
  return axios.post(`${BASE_URL}/habits/${id}/check`, {}, config(token))
}

export function uncheckHabit(id, token) {
  return axios.post(`${BASE_URL}/habits/${id}/uncheck`, {}, config(token))
}

function config(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}
