import BigNumber from 'bignumber.js';
import { Asset } from 'types';

import { TOKENS } from 'constants/tokens';

export const assetData: Asset[] = [
  {
    token: TOKENS.xvs,
    supplyApy: new BigNumber('0.05225450324405023'),
    borrowApy: new BigNumber('-2.3062487835658776'),
    xvsSupplyApy: new BigNumber('0.11720675342484096'),
    xvsBorrowApy: new BigNumber('4.17469243006608279'),
    collateralFactor: new BigNumber('0.5'),
    tokenPrice: new BigNumber('1.2786734'),
    liquidity: new BigNumber('80364658.759955212394069853'),
    borrowCaps: new BigNumber('0'),
    walletBalance: new BigNumber('100'),
    supplyBalance: new BigNumber('90'),
    borrowBalance: new BigNumber('0'),
    collateral: true,
    percentOfLimit: '0',
    treasuryTotalBorrowsCents: new BigNumber('70925716.2839193373613181'),
    treasuryTotalSupplyCents: new BigNumber('278311516.880071415163614'),
    treasuryTotalSupply: new BigNumber('19339683254955736'),
    treasuryTotalBorrows: new BigNumber('1852935.597521220541385584'),
    xvsPerDay: new BigNumber('19999999'),
  },
  {
    token: TOKENS.usdc,
    supplyApy: new BigNumber('3.887242555711379188'),
    borrowApy: new BigNumber('-5.361233028654066'),
    xvsSupplyApy: new BigNumber('1.353105649796123742'),
    xvsBorrowApy: new BigNumber('1.670327607690572731'),
    collateralFactor: new BigNumber('0.8'),
    tokenPrice: new BigNumber('0.9999364'),
    liquidity: new BigNumber('17029519.59031024692963176'),
    borrowCaps: new BigNumber('0'),
    walletBalance: new BigNumber('0'),
    supplyBalance: new BigNumber('100'),
    borrowBalance: new BigNumber('0'),
    collateral: false,
    percentOfLimit: '0',
    treasuryTotalBorrowsCents: new BigNumber('858721657509436.623174884152'),
    treasuryTotalSupplyCents: new BigNumber('1000183891879506332139.9292470565707358'),
    treasuryTotalSupply: new BigNumber('47171999131879271527200010830'),
    treasuryTotalBorrows: new BigNumber('73128318.509651061457900627'),
    xvsPerDay: new BigNumber('19999999'),
  },
  {
    token: TOKENS.usdt,
    supplyApy: new BigNumber('3.593608909332766999'),
    borrowApy: new BigNumber('-4.9748661428011145'),
    xvsSupplyApy: new BigNumber('0.421719501189155143'),
    xvsBorrowApy: new BigNumber('0.522209972682294832'),
    collateralFactor: new BigNumber('0.8'),
    tokenPrice: new BigNumber('1.00024602'),
    liquidity: new BigNumber('55341028.864399487015632422'),
    borrowCaps: new BigNumber('0'),
    walletBalance: new BigNumber('900'),
    supplyBalance: new BigNumber('0'),
    borrowBalance: new BigNumber('40'),
    collateral: false,
    percentOfLimit: '0',
    treasuryTotalBorrowsCents: new BigNumber('3158444721.332384892254'),
    treasuryTotalSupplyCents: new BigNumber('100980412010115687912488517.7789655772798633'),
    treasuryTotalSupply: new BigNumber('5029972090817266864401527367893625'),
    treasuryTotalBorrows: new BigNumber('232511166.920938849475104194'),
    xvsPerDay: new BigNumber('19999999'),
  },
  {
    token: TOKENS.busd,
    supplyApy: new BigNumber('2.886396363044176106'),
    borrowApy: new BigNumber('-4.050271277344538'),
    xvsSupplyApy: new BigNumber('0.678420831753642169'),
    xvsBorrowApy: new BigNumber('0.852697602175970714'),
    collateralFactor: new BigNumber('0.8'),
    tokenPrice: new BigNumber('1.00000922'),
    liquidity: new BigNumber('36544929.350553781829295969'),
    borrowCaps: new BigNumber('0'),
    walletBalance: new BigNumber('110'),
    supplyBalance: new BigNumber('0'),
    borrowBalance: new BigNumber('50'),
    collateral: false,
    percentOfLimit: '0',
    treasuryTotalBorrowsCents: new BigNumber('83910350502.1928887132528691'),
    treasuryTotalSupplyCents: new BigNumber('1054707853878.3839597655397544'),
    treasuryTotalSupply: new BigNumber('51881081291203672464'),
    treasuryTotalBorrows: new BigNumber('142662020.229587308931217432'),
    xvsPerDay: new BigNumber('19999999'),
  },
];
