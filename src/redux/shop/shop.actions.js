import { shopActionTypes } from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsError = (errorMessage) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  /*
  * If redux-thunk middleware is enabled, any time you attempt to dispatch a function instead of 
  * an object (上面的就是 dispatch object 例子), the middleware will call that function with dispatch method itself as the 
  * first argument.
  */
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());
    
    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap =  convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));      
      })
      .catch(error => dispatch(fetchCollectionsError(error)));
  }
};