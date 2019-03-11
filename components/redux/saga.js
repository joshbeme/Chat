import { put, all, takeLatest } from "redux-saga/effects";
import {} from './actions'
export function* getFriends(tokenId) {

  try {
    const response = fetch("http://localhost:3000/friends", {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(tokenId)
    });
    const responseBody = response.json();
    yield put(responseBody);
  } catch (err) {
    console.error(err);
  }
}
