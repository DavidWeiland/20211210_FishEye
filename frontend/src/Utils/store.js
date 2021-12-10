import { configureStore } from "@reduxjs/toolkit";
import photographersReducer from '../Features/photographers'
import photographerReducer from '../Features/photographer'
import mediasReducer from '../Features/medias'
import mediaReducer from '../Features/media'
import userReducer from '../Features/user'

export default configureStore({
  reducer: {
    photographers : photographersReducer,
    photographer : photographerReducer,
    medias: mediasReducer,
    media: mediaReducer,
    user: userReducer,
  }
})