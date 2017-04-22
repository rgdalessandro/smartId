export const SET_WALLET_ADDRESS = 'SET_WALLET_ADDRESS';
export const FETCH_ID_ADDRESS = 'FETCH_ID_ADDRESS';

export function setWalletAddress(addresses) {
 return {
   type: SET_WALLET_ADDRESS,
   payload: addresses
 };
}

export function fetchIdAddress(addresses) {
  return {
    type: FETCH_ID_ADDRESS,
    payload: addresses
  };
}
