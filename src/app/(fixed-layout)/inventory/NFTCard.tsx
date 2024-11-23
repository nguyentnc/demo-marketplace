import { useState } from 'react';
import { hexToNumber, NFT, prepareContractCall, sendAndConfirmTransaction } from 'thirdweb';
import { NFTMedia, NFTName, NFTProvider } from 'thirdweb/react';
import { Account } from 'thirdweb/wallets';

import { collectionContract, marketplaceContract, tokenContract } from '@/app/contract';
import { Button } from '@/components/Base';
import { approve } from 'thirdweb/extensions/erc721';
import { approve as approveERC20 } from 'thirdweb/extensions/erc20';
import { axiosInstance } from '@/configs/apis.config';

const NFTCard = ({
  nft,
  account,
  isListed,
  listingData,
}: {
  nft: NFT;
  account?: Account;
  isListed?: boolean;
  listingData?: {
    id: number;
    price: number;
  };
}) => {
  const [isListing, setIsListing] = useState(false);
  const isOwner = account?.address.toLowerCase() === nft.owner?.toLowerCase();

  const approveNFT = async () => {
    if (!account) {
      return;
    }

    console.log('Approving NFT...');

    const approveTx = approve({
      contract: collectionContract,
      to: marketplaceContract.address,
      tokenId: BigInt(1),
    });

    const res = await sendAndConfirmTransaction({
      account,
      transaction: approveTx,
    });

    console.log({
      approveHash: res.transactionHash,
    });

    if (res.status === 'success') {
      return true;
    }
  };

  const approveToken = async () => {
    if (!account) {
      return;
    }

    console.log('Approving ERC20 Token...');

    const approveTx = approveERC20({
      contract: tokenContract,
      spender: marketplaceContract.address,
      amount: '100000000000000',
    });

    const res = await sendAndConfirmTransaction({
      account,
      transaction: approveTx,
    });

    console.log({
      approveERC20Hash: res.transactionHash,
    });

    if (res.status === 'success') {
      return true;
    }
  };

  const listingNFT = async () => {
    if (!account) {
      return;
    }

    try {
      setIsListing(true);
      // await approveNFT();

      console.log('Listing NFT...');

      const startTime = Math.floor(Date.now() / 1000);
      const endTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
      const price = '1000000000000000000';

      const transaction = prepareContractCall({
        contract: marketplaceContract,
        method:
          'function createListing((address assetContract, uint256 tokenId, uint256 quantity, address currency, uint256 pricePerToken, uint128 startTimestamp, uint128 endTimestamp, bool reserved) _params) returns (uint256 listingId)',
        gas: BigInt(500_000),
        params: [
          {
            assetContract: collectionContract.address,
            tokenId: BigInt(nft.id),
            quantity: BigInt(1),
            currency: tokenContract.address,
            pricePerToken: BigInt(price),
            startTimestamp: BigInt(startTime),
            endTimestamp: BigInt(endTime), // 7 days
            reserved: false,
          },
        ],
      });

      const res = await sendAndConfirmTransaction({
        account,
        transaction,
      });
      const listingId = hexToNumber(res?.logs[0]?.topics[2] || '0x');

      console.log({
        listingHash: res.transactionHash,
        listingId,
      });

      console.log({ nft });

      await axiosInstance.post('/listing', {
        signature: listingId,
        startTime,
        endTime,
        price,
        owner: account?.address,
        tokenListingAddress: tokenContract.address,
        nft: {
          ...nft,
          id: Number(nft.id),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsListing(false);
    }
  };

  const buyNFT = async () => {
    if (!account || !listingData) {
      return;
    }

    try {
      setIsListing(true);
      await approveToken();

      console.log('Buying NFT...');
      const transaction = prepareContractCall({
        contract: marketplaceContract,
        method:
          'function buyFromListing(uint256 _listingId, address _buyFor, uint256 _quantity, address _currency, uint256 _expectedTotalPrice) payable',
        params: [
          BigInt(listingData.id),
          account?.address || '',
          BigInt(1),
          tokenContract.address,
          BigInt(listingData.price),
        ],
      });

      const res = await sendAndConfirmTransaction({
        account,
        transaction,
      });

      console.log({
        buyHash: res.transactionHash,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsListing(false);
    }
  };

  const createOffer = async () => {
    if (!account) {
      return;
    }

    try {
      setIsListing(true);
      await approveToken();

      console.log('Listing NFT...');

      const expirationTimestamp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
      const offerPrice = '500000000000000000';

      const transaction = prepareContractCall({
        contract: marketplaceContract,
        method:
          'function makeOffer((address assetContract, uint256 tokenId, uint256 quantity, address currency, uint256 totalPrice, uint256 expirationTimestamp) _params) returns (uint256 _offerId)',
        gas: BigInt(500_000),
        params: [
          {
            assetContract: collectionContract.address,
            tokenId: BigInt(nft.id),
            quantity: BigInt(1),
            currency: tokenContract.address,
            totalPrice: BigInt(offerPrice),
            expirationTimestamp: BigInt(expirationTimestamp),
          },
        ],
      });

      const res = await sendAndConfirmTransaction({
        account,
        transaction,
      });

      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsListing(false);
    }
  };

  return (
    <NFTProvider contract={collectionContract} tokenId={nft.id}>
      <div className='aspect-square'>
        <NFTMedia className='rounded-xl w-full h-full' />
      </div>
      <div className='mt-2 text-md font-semibold'>
        <NFTName /> #{nft.id}
      </div>

      {isOwner && account && !isListed && (
        <div className='mt-2'>
          <Button isDisabled={isListing} size='sm' onClick={listingNFT}>
            Listing
          </Button>
        </div>
      )}

      {!isOwner && account && isListed && (
        <div className='mt-2 space-x-2'>
          <Button isDisabled={isListing} size='sm' onClick={buyNFT}>
            Buy
          </Button>

          <Button size='sm' onClick={createOffer}>
            {isOwner ? 'Accept Offer' : 'Make Offer'}
          </Button>
        </div>
      )}
    </NFTProvider>
  );
};

export default NFTCard;
