'use client';
import NFTCard from '@/app/(fixed-layout)/inventory/NFTCard';
import { axiosInstance } from '@/configs/apis.config';
import { useEffect, useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';

const nfts = [
  {
    id: BigInt(1),
    signature: 2,
    metadata: {
      name: 'Nizzy',
      description: 'The NFT of Nizzy',
      image: 'https://inventory.coin98.com/images/nftvisual-sg1ci5zX8FFQvy5m.png',
    },
    owner: '0xaA1E3A9591a80b2Cd9D475a9928640a86541e72c',
    tokenURI: 'ipfs://QmeqaT8yQmSWLMp7JRLiTDqKeUJjMXyLXyE23PAd63xtGv/0',
    type: 'ERC721',
  },
];

export function Home() {
  const account = useActiveAccount();
  const [nfts, setNFTs] = useState<any[]>([]);
  console.log('Home ~ nfts:', nfts);

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    const nftsResponse = await axiosInstance.get('/listing');
    console.log('fetchNFTs ~ nftsResponse:', nftsResponse);
    setNFTs(nftsResponse.data);
  };

  return (
    <div className='container mt-section'>
      <h1 className='text-2xl font-bold'>New Listed NFTs</h1>
      <div className='mt-6 grid grid-cols-4 gap-6'>
        {nfts.map(nft => {
          return (
            <div key={nft._id}>
              <NFTCard
                nft={nft.nft as any}
                account={account}
                isListed
                listingData={{ id: nft.signature, price: nft.price }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
