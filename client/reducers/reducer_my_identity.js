/**
 * Created by ricardodalessandro on 4/22/17.
 */
import { SET_MY_IDENTITY } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {

    case SET_MY_IDENTITY:
      const myIdentity = action.payload;
      return { ...state, ...myIdentity };

    default:
      return state;
  }
}
