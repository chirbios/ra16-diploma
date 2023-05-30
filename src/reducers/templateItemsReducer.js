import { createSlice } from '@reduxjs/toolkit'
import { statusTypes } from '../store/storeTypes'

const defaultState = {
  items: [],
  selectedItem: {},
  status: statusTypes.IDLE
};

const generateItemsReducer = ({ name, url, initialState = defaultState }) => createSlice({
  name: name,
  initialState: initialState,
  reducers: {

    requestItems: {
      reducer: (state, action) => {
        if (!action.payload.update)
          state.items = [];
        state.status = statusTypes.LOADING;
      },
      prepare: (data, update = false) => ({
        payload: data ? {
          name,
          url,
          data,
          update: update ? true : false
        } : {
          name,
          url,
          update: update ? true : false
        },

      })
    },

    setItemsSuccess(state, action) {
      state.items = [...state.items, ...action.payload];
      state.status = statusTypes.SUCCESS;
    },

    setItemsIdle(state, action) {
      state.items = [...state.items, ...action.payload];
      state.status = statusTypes.IDLE;
    },

    setItemsError(state, action) {
      state.items = [];
      state.status = statusTypes.ERROR;
    },

    selectItem(state, action) {
      state.selectedItem = action.payload;
    },

    postDataRequest: {
      reducer: (state, action) => {
        state.status = statusTypes.LOADING;
        console.log('postDataRequest', action)
      },
      prepare: (data) => ({
        payload: {
          data,
          name,
          url
        }
      })
    }
  },
});

export default generateItemsReducer;