import { createSlice } from '@reduxjs/toolkit'
import { statusTypes } from '../store/storeTypes'

const defaultState = {
  items: [],
  status: statusTypes.IDLE       
};
const preLoadStorageState = (name, initialState) => {
  const data = sessionStorage.getItem(name)
  return data !== null ? JSON.parse(data) : initialState
}

const generateStorageReducer = ({ name, initialState = defaultState }) => createSlice({
  name: name,
  initialState: preLoadStorageState(name, initialState),
  reducers: {

    setItems: {
      reducer: (state, action) => {
        state.items = action.payload.data.sort();
        state.status = statusTypes.IDLE;
      },
      prepare: (data, name) => ({
        payload: {
          data,
          name
        }
      })
    },

    clearItems: {
      reducer: (state, action) => {
        state.items = [];
      },
      prepare: (name) => ({
        payload: {
          name
        }
      })
    },

    setStatus: {
      reducer: (state, action) => {
        if (Object.keys(statusTypes).some((item) => statusTypes[item] === action.payload.data))
          state.status = action.payload.data;
      },
      prepare: (data, name) => ({
        payload: {
          data,
          name
        }
      })
    }
  }
});

export default generateStorageReducer;