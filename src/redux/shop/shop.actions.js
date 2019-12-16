import { shopActionTypes } from './shop.types';

export const fetchCollectionsStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});


/*
* 這段code是redux-thunk在處理 async request 時的寫法，目前已被 redux-saga 取代。
* 可以去 shop.sagas.js 的 function* fetchCollectionsAsync() 查看 saga 的寫法
*/
// export const fetchCollectionsStartAsync = () => {
//   /*
//   * If redux-thunk middleware is enabled, any time you attempt to dispatch a function instead of 
//   * an object (上面的就是 dispatch object 例子), the middleware will call that function with dispatch method itself as the 
//   * first argument.
//   */
//   return dispatch => {
//     const collectionRef = firestore.collection('collections');
//     // 觸發 fetchCollectionsStart action，使得 shop.state 的 isLoading=true (為了做 spinner 的效果)
//     dispatch(fetchCollectionsStart());
//     // 實際要資料
//     collectionRef
//       .get()
//       .then(snapshot => {
//         // 將資料轉換成 array
//         const collectionsMap =  convertCollectionsSnapshotToMap(snapshot);
//         // 觸發 fetchCollectionsSuccess action，將資料 collectionsMap 送給 shop.reducer，使得 shop.state 的 collections 被賦予值(不再是 null)
//         dispatch(fetchCollectionsSuccess(collectionsMap));      
//       })
//       .catch(error => dispatch(fetchCollectionsFailure(error)));
//   }
// };