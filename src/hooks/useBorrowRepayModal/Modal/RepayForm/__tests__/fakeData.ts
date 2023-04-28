import BigNumber from 'bignumber.js';
import { Asset, Pool } from 'types';

import { poolData } from '__mocks__/models/pools';

export const fakePool: Pool = {
  ...poolData[0],
  userBorrowBalanceCents: 10,
  userBorrowLimitCents: 1000,
};

export const fakeAsset: Asset = {
  ...fakePool.assets[0],
  userBorrowBalanceTokens: new BigNumber(1000),
  userWalletBalanceTokens: new BigNumber(10000000),
  tokenPriceDollars: new BigNumber(1),
};