import User from '../../models/User';
import fetch from '../../auth/FetchInterceptor';
import { AUTH } from '../../constants/FrontendUrl';
import * as UserRoutes from '../../services/users/routes';
import { AUTH_PREFIX_PATH } from '../../configs/AppConfig';
import { AUTH_TOKEN, AUTH_USER, SIGNOUT } from '../constants/Auth';
import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { showAuthMessage, loginUserSuccess } from "../actions/Auth";

export function* watchSetAuthUser() {
	yield takeEvery(AUTH_USER, setAuthUser);
}

const getAuthData = async () => {
	return await fetch.get(UserRoutes.KYC);
};

function* setAuthUser({ callback }) {
	try {
		const authUserResponse = yield call(getAuthData);
		yield put(loginUserSuccess(new User(authUserResponse.data)));
	} catch (e) {
		if(!window.location.href.includes(AUTH_PREFIX_PATH))
			window.location.replace(AUTH.LOGIN);
	} finally {
	  if (callback) callback();
	}
  }

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
		try {
			localStorage.removeItem(AUTH_TOKEN);
			if(!window.location.href.includes(AUTH_PREFIX_PATH))
				window.location.replace(AUTH.LOGIN);
		} catch (err) {
			yield put(showAuthMessage(err));
		}
	});
}

export default function* rootSaga() {
  yield all([
		fork(signOut),
		fork(watchSetAuthUser),
  ]);
}
