import { createSlice } from '@reduxjs/toolkit'
import { statusTypes } from '../store/storeTypes'

const defaultState = {
  result: {},
  status: statusTypes.IDLE
};

const generatePostDataReducer = ({ name, url, initialState = defaultState }) => createSlice({
  name: name,
  initialState: initialState,
  reducers: {

    postDataRequest: {
      reducer: (state, action) => {
        state.result = {};
        state.status = statusTypes.LOADING;
      },
      prepare: (data) => ({
        payload: {
          data,
          name,
          url
        }
      })
    },

    postDataSuccess(state, action) {
      state.result = action.payload;
      state.status = statusTypes.SUCCESS;
    },

    postDataError(state, action) {
      state.result = action.payload;
      state.status = statusTypes.ERROR;
    },

    clearPostResult(state, action) {
      state.result = {};
      state.status = statusTypes.IDLE;
    },

    setStatus(state, action) {
      if (Object.keys(statusTypes).indexOf(action.payload) !== -1)
        state.status = action.payload;
    }
  },
});


export default generatePostDataReducer;