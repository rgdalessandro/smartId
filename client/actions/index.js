export const SET_WALLET_ADDRESS = 'SET_WALLET_ADDRESS';
export const SET_ID_ADDRESS = 'SET_ID_ADDRESS';

export function setWalletAddress(addresses) {
  return {
    type: SET_WALLET_ADDRESS,
    payload: addresses
  };
}

export function setIdAddress(addresses) {
  return {
    type: SET_ID_ADDRESS,
    payload: addresses
  };
}
