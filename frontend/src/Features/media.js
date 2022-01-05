import { selectMedia } from '../Utils/selectors'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  status: 'void',
  data: null,
  error:null
}

const { actions, reducer } = createSlice({
  name: 'media',
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
        draft.data = null
        draft.error = action.payload
        return
      }
      return
    },
  },
})


export async function createOneMedia(store, thing, image, token) {
  const status = selectMedia(store.getState()).status
  const body = new FormData()
  body.append('thing', JSON.stringify(thing))
  body.append('image', image, thing.title)
  
  const axiosBody = {
    method: 'post',
    url: `http://localhost:3001/api/media/`,
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

export async function getOneMedia(store, id, token) {
  const status = selectMedia(store.getState()).status
  const axiosBody = {
    method: 'get',
    url: `http://localhost:3001/api/media/${id}`,
    headers:{authorization: `Bearer ${token}`}
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

export async function modifyOneMedia(store, mediaId, token, image, thing) {
  const status = selectMedia(store.getState()).status
  let body
  if (typeof image === 'string') {
    thing.mediaUrl = image
    body = thing
  } else {
    body = new FormData()
    body.append('thing', JSON.stringify(thing))
    body.append('image', image, thing.title)
  }
  const axiosBody = {
    method: 'put',
    url: `http://localhost:3001/api/media/${mediaId}`,
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

export async function likeOneMedia(store, mediaId, body) {
  const status = selectMedia(store.getState()).status
  const axiosBody = {
    method: 'put',
    url: `http://localhost:3001/api/media/public/${mediaId}`,
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

export async function deleteOneMedia(store, id, token) {
  const status = selectMedia(store.getState()).status
  const axiosBody = {
    method: 'delete',
    url: `http://localhost:3001/api/media/${id}`,
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

export default reducer