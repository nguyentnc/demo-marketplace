'use client';

import React, { useEffect } from 'react';

import { client } from '../client';
import { ConnectButton, useActiveAccount, useSendAndConfirmTransaction } from 'thirdweb/react';
import { sepolia } from 'thirdweb/chains';
import { prepareContractCall } from 'thirdweb';
import { approve, mintTo, getNFTs } from 'thirdweb/extensions/erc721';
import { approve as approveTokenERC20 } from 'thirdweb/extensions/erc20';

import { collectionContract, marketplaceContract, tokenContract } from '../contract';

const TestService = () => {
  const account = useActiveAccount();
  const { mutate: sendMintNftTransaction, data: mintTxData } = useSendAndConfirmTransaction();
  const {
    mutate: sendListingTransaction,
    data: listingTxData,
    error: listingError,
  } = useSendAndConfirmTransaction();
  const { mutate: sendApproveTransaction, data: approveTxData } = useSendAndConfirmTransaction();
  const { mutate: sendBuyTransaction, data: buyTxData, error } = useSendAndConfirmTransaction();

  console.log({ mintTxData, listingTxData, buyTxData, error, approveTxData });

  const mintNFT = async () => {
    const transaction = mintTo({
      contract: collectionContract,
      to: account?.address || '',
      nft: {
        name: 'Nizzy',
        description: 'The NFT of Nizzy',
        image: 'https://inventory.coin98.com/images/nftvisual-sg1ci5zX8FFQvy5m.png',
      },
    });

    sendMintNftTransaction(transaction);
  };

  // const approveNFT = async () => {
  //   console.log('Approving NFT');

  //   const approveTx = approve({
  //     contract: collectionContract,
  //     to: marketplaceContract.address,
  //     tokenId: BigInt(1),
  //   });

  //   sendApproveTransaction(approveTx);
  // };

  // const approveERC20 = async () => {
  //   const approveTx = approveTokenERC20({
  //     contract: tokenContract,
  //     spender: marketplaceContract.address,
  //     amount: 1000000,
  //   });

  //   sendApproveTransaction(approveTx);
  // };

  const listingNFT = async () => {
    console.log('Listing NFT');

    try {
      const transaction = prepareContractCall({
        contract: marketplaceContract,
        method:
          'function createListing((address assetContract, uint256 tokenId, uint256 quantity, address currency, uint256 pricePerToken, uint128 startTimestamp, uint128 endTimestamp, bool reserved) _params) returns (uint256 listingId)',
        params: [
          {
            assetContract: collectionContract.address,
            tokenId: BigInt(1),
            quantity: BigInt(1),
            currency: '0x2cdc1f3cc2306367bcfab4ff09e6a3602baf50f0',
            pricePerToken: BigInt('10000000000000000'),
            startTimestamp: BigInt(Math.floor(Date.now() / 1000)),
            endTimestamp: BigInt(Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7),
            reserved: false,
          },
        ],
      });

      sendListingTransaction(transaction);
    } catch (error) {
      console.log('first error', error);
    }
  };

  const buyNFT = async () => {
    const transaction = prepareContractCall({
      contract: marketplaceContract,
      method:
        'function buyFromListing(uint256 _listingId, address _buyFor, uint256 _quantity, address _currency, uint256 _expectedTotalPrice) payable',
      params: [
        BigInt(1),
        account?.address || '',
        BigInt(1),
        '0x2cdc1f3cc2306367bcfab4ff09e6a3602baf50f0',
        BigInt('10000000000000000'),
      ],
    });

    sendBuyTransaction(transaction);
  };

  useEffect(() => {
    getNFTs({ contract: collectionContract, start: 0, count: 20 }).then(console.log);
  }, []);

  return (
    <div className='p-10'>
      <ConnectButton client={client} chains={[sepolia]} />

      {account && (
        <div className='mt-10'>
          <div>
            <button onClick={mintNFT}>Mint NFT</button>
          </div>

          <div>
            <button onClick={listingNFT}>Listing NFT</button>
          </div>

          <div>
            <button onClick={buyNFT}>Buy NFT</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestService;
