import { selectPhotographer } from '../Utils/selectors'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

const { actions, reducer } = createSlice({
  name: 'photographer',
  initialState,
  reducers: {
    fetching: (draft, action) => {
      if (draft.status === 'void') {
        draft.status = 'pending'
        return
      }
      if (draft.status === 'rejected') {
        draft.error = null
        draft.status = 'pending'
        return
      }
      if (draft.status === 'resolved') {
        draft.status = 'updating'
        return
      }
      return
    },
    resolved: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.status = 'resolved'
        draft.data = action.payload
        return
      }
      return
    },
    rejected: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.status = 'rejected'
        draft.error = action.payload
        draft.data = null
        return
      }
      return
    },
  },
})

export async function getOnePhotographer(store, photographerId, token) {
  const status = selectPhotographer(store.getState()).status
  const axiosBody = {
    method: 'get',
    url: `http://localhost:3001/api/photographer/:${photographerId}`,
    authorization: `BEARER ${token}`,
  }
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(actions.fetching())
  try {
    const response = await axios(axiosBody)
    const data = await response.json()
    store.dispatch(actions.resolved(data))
  } catch (error) {
    store.dispatch(actions.rejected(error))
  }
}

export async function createOnePhotographer(store, body, token) {
  const status = selectPhotographer(store.getState()).status
  const axiosBody = {
    method: 'post',
    url: `http://localhost:3001/api/photographer`,
    data: body,
    headers: { 'authorization': `Bearer ${token}` },
  }
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(actions.fetching())
  try {
    const response = await axios(axiosBody)
    const resData = await response.data.body
    store.dispatch(actions.resolved(resData))
  } catch (error) {
    store.dispatch(actions.rejected(error))
  }
}

export async function modifyOnePhotographer(store, photographerId) {
  const status = selectPhotographer(store.getState()).status
  const axiosBody = {
    method: 'post',
    url: `http://localhost:3001/api/photographer/:${photographerId}`,
  }
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(actions.fetching())
  try {
    const response = await axios(axiosBody)
    const data = await response.json()
    store.dispatch(actions.resolved(data))
  } catch (error) {
    store.dispatch(actions.rejected(error))
  }
}

export default reducer
