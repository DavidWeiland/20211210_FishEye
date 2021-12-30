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
    reset: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.status = 'void'
        draft.error = null
        draft.data = null
        return
      }
      return
    },
  },
})

export async function getOnePhotographer(store, userId) {
  const status = selectPhotographer(store.getState()).status
  const axiosBody = {
    method: 'get',
    url: `http://localhost:3001/api/photographer/${userId}`,
  }
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(actions.fetching())
  try {
    const response = await axios(axiosBody)
    const data = await response.data
    store.dispatch(actions.resolved(data))
  } catch (error) {
    store.dispatch(actions.rejected(error))
  }
}

export async function createOnePhotographer(store, thing, image, token) {
  const status = selectPhotographer(store.getState()).status
  const body = new FormData()
  body.append('thing', JSON.stringify(thing))
  body.append('image', image, thing.name)
  
  const axiosBody = {
    method: 'post',
    url: `http://localhost:3001/api/photographer/`,
    data: body,
    headers: { authorization: `Bearer ${token}` },
  }
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(actions.fetching())
  try {
    const response = await axios(axiosBody)
    const data = await response.data
    store.dispatch(actions.resolved(data))
  } catch (error) {
    store.dispatch(actions.rejected(error))
  }
}

export async function modifyOnePhotographer(store, photographerId, token, image, thing) {
  const status = selectPhotographer(store.getState()).status
  let body
  if (typeof image === 'string') {
    thing.portraitUrl = image;
    body = thing;
  } else {
    body = new FormData();
    body.append('thing', JSON.stringify(thing));
    body.append('image', image, thing.name);
  }
  const axiosBody = {
    method: 'put',
    url: `http://localhost:3001/api/photographer/${photographerId}`,
    headers: { authorization: `Bearer ${token}` },
    data: body
  }
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(actions.fetching())
  try {
    const response = await axios(axiosBody)
    const data = await response.data
    store.dispatch(actions.resolved(data))
  } catch (error) {
    store.dispatch(actions.rejected(error))
  }
}

export async function resetPhotographer(store) {
  const status = selectPhotographer(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(actions.fetching())
  store.dispatch(actions.reset())
}

export default reducer
