import { render as rtlRender } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import photographersReducer from '../../Features/photographers'
import photographerReducer from '../../Features/photographer'
import mediasReducer from '../../Features/medias'
import mediaReducer from '../../Features/media'
import userReducer from '../../Features/user'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

export function render(ui, options) {
  const store = configureStore({
    reducer: {
      photographers : photographersReducer,
      photographer : photographerReducer,
      medias: mediasReducer,
      media: mediaReducer,
      user: userReducer,
    }
  })

  function Wrapper({ children }) {
    return (
      <MemoryRouter {...options}>
        <Provider store={store}>{ children }</Provider>
      </MemoryRouter>
    )
  }
  rtlRender(ui, { wrapper: Wrapper })
}