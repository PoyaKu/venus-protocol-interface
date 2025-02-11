import { abi as poolLensAbi } from '@venusprotocol/isolated-pools/artifacts/contracts/Lens/PoolLens.sol/PoolLens.json';
import { ContractCallContext, ContractCallResults } from 'ethereum-multicall';
import { getContractAddress } from 'utilities';

import vaiVaultAbi from 'constants/contracts/abis/vaiVault.json';
import venusLensAbi from 'constants/contracts/abis/venusLens.json';
import xvsVaultAbi from 'constants/contracts/abis/xvsVault.json';
import { TOKENS } from 'constants/tokens';

import formatOutput from './formatOutput';
import { GetPendingRewardGroupsInput, GetPendingRewardGroupsOutput } from './types';

const venusLensAddress = getContractAddress('venusLens');
const poolLensAddress = getContractAddress('PoolLens');
const vaiVaultAddress = getContractAddress('vaiVault');
const xvsVaultAddress = getContractAddress('xvsVaultProxy');

const getPendingRewardGroups = async ({
  mainPoolComptrollerAddress,
  isolatedPoolComptrollerAddresses,
  xvsVestingVaultPoolCount,
  multicall,
  accountAddress,
}: GetPendingRewardGroupsInput): Promise<GetPendingRewardGroupsOutput> => {
  // Generate call context
  const contractCallContext: ContractCallContext[] = [
    // Pending rewards from main pool
    {
      reference: 'venusLens',
      contractAddress: venusLensAddress,
      abi: venusLensAbi,
      calls: [
        {
          reference: 'pendingRewards',
          methodName: 'pendingRewards',
          methodParameters: [accountAddress, mainPoolComptrollerAddress],
        },
      ],
    },
    // Pending rewards from vaults
    {
      reference: 'vaiVault',
      contractAddress: vaiVaultAddress,
      abi: vaiVaultAbi,
      calls: [
        {
          reference: 'pendingXVS',
          methodName: 'pendingXVS',
          methodParameters: [accountAddress],
        },
      ],
    },
    {
      reference: 'xvsVestingVaults',
      contractAddress: xvsVaultAddress,
      abi: xvsVaultAbi,
      calls: new Array(xvsVestingVaultPoolCount).fill(undefined).reduce(
        (acc, _item, poolIndex) =>
          acc.concat([
            {
              reference: `vault-${poolIndex}-poolInfos`,
              methodName: 'poolInfos',
              methodParameters: [TOKENS.xvs.address, poolIndex],
            },
            {
              reference: `vault-${poolIndex}-pendingReward`,
              methodName: 'pendingReward',
              methodParameters: [TOKENS.xvs.address, poolIndex, accountAddress],
            },
            {
              reference: `vault-${poolIndex}-pendingWithdrawalsBeforeUpgrade`,
              methodName: 'pendingWithdrawalsBeforeUpgrade',
              methodParameters: [TOKENS.xvs.address, poolIndex, accountAddress],
            },
          ]),
        [],
      ),
    },
  ];

  if (isolatedPoolComptrollerAddresses.length > 0) {
    // Pending rewards from isolated pools
    contractCallContext.push({
      reference: 'poolLens',
      contractAddress: poolLensAddress,
      abi: poolLensAbi,
      calls: isolatedPoolComptrollerAddresses.map(isolatedPoolComptrollerAddress => ({
        reference: 'getPendingRewards',
        methodName: 'getPendingRewards',
        methodParameters: [accountAddress, isolatedPoolComptrollerAddress],
      })),
    });
  }

  const contractCallResults: ContractCallResults = await multicall.call(contractCallContext);

  const pendingRewardGroups = formatOutput({
    contractCallResults,
  });

  return {
    pendingRewardGroups,
  };
};

export default getPendingRewardGroups;
