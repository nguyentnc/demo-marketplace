'use client';
import NFTCard from '@/app/(fixed-layout)/inventory/NFTCard';
import { axiosInstance } from '@/configs/apis.config';
import { useEffect, useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';

export function Home() {
  const account = useActiveAccount();
  const [nfts, setNFTs] = useState<any[]>([]);
  console.log('Home ~ nfts:', nfts);

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    const nftsResponse = await axiosInstance.get('/listing');
    setNFTs(nftsResponse.data);
  };

  const onBuySuccess = async (id: string) => {
    await axiosInstance.delete(`/listing/delete/${id}`);
    await fetchNFTs();
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
                onBuySuccess={() => onBuySuccess(nft._id)}
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
