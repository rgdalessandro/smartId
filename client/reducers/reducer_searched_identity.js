/**
 * Created by ricardodalessandro on 4/22/17.
 */
import { SET_SEARCHED_IDENTITY } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {

    case SET_SEARCHED_IDENTITY:
      const searchedIdentity = action.payload;
      return { ...state, ...searchedIdentity };

    default:
      return state;
  }
}
