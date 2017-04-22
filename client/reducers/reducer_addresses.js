/**
 * Created by ricardodalessandro on 4/22/17.
 */
import { SET_WALLET_ADDRESS, SET_ID_ADDRESS } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {

    case SET_WALLET_ADDRESS:
      const { wallet } = action.payload;
      return { ...state, wallet };

    case SET_ID_ADDRESS:
      const { id } = action.payload;
      return { ...state, id };

    default:
      return state;
  }
}
