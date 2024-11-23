import { defineChain, getContract } from 'thirdweb';
import { sepolia } from 'thirdweb/chains';

import { client } from './client';

export const collectionContract = getContract({
  client,
  chain: defineChain(sepolia),
  address: '0x576D9EaC14780aE017b61c33e69D2BABFCBda6bE',
});

export const marketplaceContract = getContract({
  client,
  chain: defineChain(11155111),
  address: '0x1162365BCde8A0F91C36D07A1264992A5C2Db983',
});

export const tokenContract = getContract({
  client,
  chain: defineChain(11155111),
  address: '0x2cdc1f3cc2306367bcfab4ff09e6a3602baf50f0',
});
