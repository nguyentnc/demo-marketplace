'use client';
import Container from '@/components/Layouts/Container';
import { contractCollection, THIRDWEB_COLLECTION } from '@/services/thirdweb';
import { mintTo } from 'thirdweb/extensions/erc721';

import { Form } from '@/components/Base/Form';
import LoadingButton from '@/components/Base/LoadingButton';
import { FormInput } from '@/components/Common/Form/FormItem';
import { useToast } from '@/hooks/internals';
import { get } from 'lodash';
import { useForm } from 'react-hook-form';
import { useActiveAccount, useSendAndConfirmTransaction } from 'thirdweb/react';
import useCollectionInfo from './useCollectionInfo';
import axios from 'axios';
import { hexToNumber } from 'thirdweb';

type Props = {};

type TFormData = {
  name: string;
  description: string;
  image: string;
};
export function Collection({}: Props) {
  const toast = useToast();
  const { data, isLoading } = useCollectionInfo({
    address: THIRDWEB_COLLECTION,
  });

  const methods = useForm<TFormData>({
    defaultValues: {
      name: 'NFT Name',
      description: 'Lorem ipsum dolor sit.',
    },
  });
  const {
    formState: { isSubmitting, isValid },
    reset,
  } = methods;
  const { mutateAsync: sendTransaction, status } = useSendAndConfirmTransaction();
  const activeAccount = useActiveAccount();

  const onSubmit = async (data: TFormData) => {
    try {
      if (!activeAccount) {
        return;
      }
      const picsumImage = (await axios.get('https://picsum.photos/500')).request.responseURL;

      const transaction = mintTo({
        contract: contractCollection,
        to: activeAccount?.address,
        nft: { ...data, image: picsumImage },
      });

      const receipt = await sendTransaction(transaction);
      const tokenId = hexToNumber(receipt?.logs[0]?.data || '0x');
      console.log('🚀 ~ onSubmit ~ tokenId:', tokenId);

      if (!receipt) {
        throw new Error('Transaction failed');
      }

      toast.success('NFT minted successfully');

      reset();
    } catch (error) {
      toast.error(get(error, 'message', 'An error occurred'));
    }
  };

  return (
    <Container className='py-10'>
      <div>
        <Form methods={methods} onSubmit={onSubmit} className='max-w-screen-sm mx-auto'>
          <div className='space-y-4'>
            <div className='flex items-center space-x-4'>
              {data.image && (
                <div className='w-20 h-20 object-cover object-center rounded-sm'>
                  <img src={data.image} alt={data.name} />
                </div>
              )}
              <h1 className='text-2xl font-bold'>Mint NFT from {data.name} </h1>
            </div>
            <div className='font-bold text-xl'>Description: {data.description}</div>
            <FormInput
              name='name'
              label='Name'
              rules={{
                required: 'Name is required',
              }}
            />
            <FormInput
              name='description'
              label='Description'
              rules={{
                required: 'Description is required',
              }}
            />
          </div>
          <LoadingButton
            loading={isSubmitting}
            fullWidth
            disabled={isSubmitting}
            type='submit'
            className='mt-8'
            size='lg'>
            Mint Nft
          </LoadingButton>
        </Form>
      </div>
    </Container>
  );
}

export default Collection;
