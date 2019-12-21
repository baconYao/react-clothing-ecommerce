import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserAcyionTypes from './user.types';

import { googleSignInSuccess, googleSignInFailure } from "./user.actions";

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapShopt = yield userRef.get();
    yield put(googleSignInSuccess({ id: userSnapShopt.id, ...userSnapShopt.data() }));
  } catch(error) {
    yield put(googleSignInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserAcyionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}