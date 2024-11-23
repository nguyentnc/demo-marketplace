import Modal from '@/components/Base/Modal';
import { CloseIcon } from '@/components/Icons';
import Link from 'next/link';
import React from 'react';

type Props = {
  isOpen: boolean;
  children: JSX.Element;
  handleCloseMenu: () => void;
};

const SideMenuMobile = ({ isOpen, children, handleCloseMenu }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => {}}
      contentContainerClass='!p-0'
      contentClass='rounded-none w-screen h-screen '
      key='side-bar'
      autoFocus={false}>
      <div className='flex flex-col'>
        <div className='flex w-full items-center justify-between border-b p-4'>
          <Link className=' h-5 w-[105px] sm:h-[48px] sm:w-[151px]' href='/'>
            <img
              src={`/assets/images/logo.png`}
              alt='image-logo'
              className='h-full w-full object-contain object-center'
            />
          </Link>
          <div className='rounded-full border p-1' onClick={handleCloseMenu}>
            <CloseIcon className='h-5 w-5 cursor-pointer text-theme-black duration-150' />
          </div>
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default SideMenuMobile;
