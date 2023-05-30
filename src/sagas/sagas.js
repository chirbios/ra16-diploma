import { put, call, takeLatest, all } from 'redux-saga/effects'
import * as api from '../api/api'
import { reducerNames } from '../const/reducerNames'
import { URL } from '../const/URL'
import { itemActions, listActions, postActions } from '../reducers'

function* handleTemplateRequestItemsSaga(name, actions, action) {
  try {
    const reducerInfo = reducerNames.reducersListData.find((v) => v.name === name);
    const fullUrl = URL.server + (reducerInfo === undefined ? '' : reducerInfo.url);
    const data = yield call(api.getItemsList, fullUrl, action.payload.data);
    if (data.length >= 6) {
      yield put(actions.setItemsSuccess(data));
    }
    else {
      yield put(actions.setItemsIdle(data));
    }
    return data;
  }
  catch (e) {
    yield put(actions.setItemsError(e.message));
  }
}

function* handleTemplateRequestItemDetailsSaga(name, actions, action) {
  try {
    const reducerInfo = reducerNames.reducersItemData.find((v) => v.name === name);
    const fullUrl = URL.server + (reducerInfo === undefined ? '' : reducerInfo.url);
    const data = yield call(api.getItemDetails, fullUrl, action.payload.data);
    yield put(actions.setItemDetailsSuccess(data));
    return data;
  }
  catch (e) {
    yield put(actions.setItemDetailsError(e.message));
  }
}

function* handleTemplatePostDataSaga(name, actions, action) {

  try {
    const reducerInfo = reducerNames.postData.find((v) => v.name === name);
    const fullUrl = URL.server + (reducerInfo === undefined ? '' : reducerInfo.url);
    const data = yield call(api.postData, fullUrl, action.payload.data);
    yield put(actions.postDataSuccess(data));
    return data;
  }
  catch (e) {
    yield put(actions.postDataError(e.message));
  }
}

export default function* saga() {
  yield all(
    [
      ...Object.keys(postActions).map((v) => takeLatest(postActions[v].postDataRequest, handleTemplatePostDataSaga, v, postActions[v])),
      ...Object.keys(itemActions).map((v) => takeLatest(itemActions[v].requestItemDetails, handleTemplateRequestItemDetailsSaga, v, itemActions[v])),
      ...Object.keys(listActions).map((v) => takeLatest(listActions[v].requestItems, handleTemplateRequestItemsSaga, v, listActions[v])),
    ]
  );
}