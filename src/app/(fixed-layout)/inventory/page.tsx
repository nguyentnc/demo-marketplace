'use client';

import { useEffect, useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { getNFTs } from 'thirdweb/extensions/erc721';
import { collectionContract } from '@/app/contract';
import NFTCard from './NFTCard';

const InventoryPage = () => {
  const account = useActiveAccount();

  const [nfts, setNFTs] = useState<any[]>([]);

  useEffect(() => {
    fetchNFTs();
  }, [account?.address]);

  const fetchNFTs = async () => {
    const nftsResponse = await getNFTs({
      contract: collectionContract,
      start: 1,
      includeOwners: true,
    });

    const filteredNFTs = nftsResponse.filter(nft => {
      return nft.owner?.toLowerCase() === account?.address.toLowerCase();
    });
    setNFTs(filteredNFTs);
  };

  return (
    <div className='container py-10 px-6 grid grid-cols-4 gap-6'>
      {nfts.map(nft => {
        return (
          <div key={nft.id}>
            <NFTCard nft={nft} account={account} />
          </div>
        );
      })}
    </div>
  );
};

export default InventoryPage;
