import { storageActions } from "../reducers"

export const storageMiddleware = (state) => (next) => (action) => {
  const result = next(action);
  if (Object.keys(storageActions).some((item) => item === action.payload.name)) {
    sessionStorage.setItem(action.payload.name, JSON.stringify(state.getState()[action.payload.name]));
  }
  return result
}