import { createSlice } from '@reduxjs/toolkit'
import { statusTypes } from '../store/storeTypes';

const defaultState = {
  item: {},
  status: statusTypes.IDLE
};
const generateItemDetailsReducer = ({ name, url, initialState = defaultState }) => createSlice({
  name: name,
  initialState: initialState,
  reducers: {

    requestItemDetails: {
      reducer: (state, action) => {
        state.status = statusTypes.LOADING;
      },
      prepare: (data) => ({
        payload: {
          name,
          url,
          data
        }
      })
    },

    setItemDetailsSuccess(state, action) {
      state.item = action.payload;
      state.status = statusTypes.SUCCESS;
    },

    setItemDetailsError(state, action) {
      state.item = {};
      state.status = statusTypes.ERROR;
    },
  },
});


export default generateItemDetailsReducer;