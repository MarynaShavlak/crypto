import { cryptoAssets, cryptoData } from '../data';

export function funkFetchCrypto() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 200);
  });
}

export function funkFetchAssets() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 200);
  });
}
