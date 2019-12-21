import { takeLatest, call, put } from 'redux-saga/effects';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { shopActionTypes } from './shop.types';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionsAsync() {
  yield console.log("I am fire");

  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    // 我們原本的處理方式如下
    // const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    // 但因為使用 saga，所以在執行 function 時，都要用 call 來呼叫
    // 而用在 call 之前，都需要加上 yield 來讓 saga 做控制
    // ref: https://medium.com/enjoy-life-enjoy-coding/redux-saga-redux-%E7%95%8C%E7%9A%84%E9%9D%9E%E5%90%8C%E6%AD%A5%E6%95%91%E6%98%9F-%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95-d38ce3e64308
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    // put 用來觸發 dispatch
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch(error) {
    yield put(fetchCollectionsFailure(error));
  }
}

export function* fetchCollectionsStart() {
  // 監聽 FETCH_COLLECTIONS_START，當此 action 被觸發時，就會呼叫 fetchCollectionsAsync 去處理
  yield takeLatest(shopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}