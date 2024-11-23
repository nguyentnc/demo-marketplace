import { CloseIcon } from '@/components/Icons';
import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';
import { Fragment, ReactNode, useEffect, useRef } from 'react';

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean | undefined;
  handleClose: () => void;
  dialogClass?: string;
  contentClass?: string;
  contentContainerClass?: string;
  backdropClass?: string;
  closeIconClass?: string;
  isCloseIcon?: boolean;
  isCloseBackDrop?: boolean;
  isScrollContent?: boolean;
  unmount?: boolean;
  autoFocus?: boolean;
};

function Modal({
  children,
  isOpen,
  handleClose,
  dialogClass,
  contentClass,
  contentContainerClass,
  backdropClass,
  isCloseIcon,
  isCloseBackDrop = true,
  isScrollContent,
  unmount = true,
  autoFocus = true,
  closeIconClass,
}: ModalProps) {
  const refDiv = useRef<HTMLDivElement>(null);

  function handleCloseModal() {
    if (isCloseBackDrop) {
      handleClose();
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (document.getElementById('headlessui-portal-root')) {
        document.body.classList.remove('overflow-hidden');
        document.getElementsByTagName('html')[0].style.overflow = '';
      }
    };
  }, []);

  return (
    <Transition
      afterLeave={() => {
        setTimeout(() => {
          if (!document.getElementById('headlessui-portal-root')) {
            document.body.classList.remove('overflow-hidden');
            document.getElementsByTagName('html')[0].style.overflow = '';
          }
        }, 100);
      }}
      afterEnter={() => {
        document.body.classList.add('overflow-hidden');
      }}
      appear
      show={isOpen || false}
      as={Fragment}
      unmount={unmount}>
      <Dialog
        unmount={unmount}
        initialFocus={refDiv}
        className={cn(['modal relative z-modal', dialogClass])}
        onClose={handleCloseModal}
        autoFocus={autoFocus}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div
            className={cn([
              'fixed inset-0 bg-black bg-opacity-80',
              backdropClass,
            ])}
          />
        </Transition.Child>

        <div
          className={cn('fixed inset-0', {
            'overflow-y-auto': !isScrollContent,
          })}>
          <div
            className={cn([
              'flex min-h-full items-center justify-center p-4 text-center',
              contentContainerClass,
            ])}>
            <Transition.Child
              unmount={unmount}
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel
                className={cn([
                  'relative w-full transform rounded-[10px] bg-theme-white text-left transition-all ',
                  contentClass,
                ])}>
                {isCloseIcon && (
                  <CloseIcon
                    onClick={handleClose}
                    className={cn([
                      'absolute right-4 top-4 h-6 w-6 cursor-pointer text-theme-black/50 duration-150 hover:text-theme-black',
                      closeIconClass,
                    ])}
                  />
                )}

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        {/* This ref cheating disable auto focus element when dialog open */}
        <div ref={refDiv} className='invisible'></div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
