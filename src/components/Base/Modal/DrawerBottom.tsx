import CloseIcon from '@/icons/close.svg';
import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';
import { Fragment, ReactNode, useEffect, useMemo, useRef } from 'react';

import { SCREEN_BREAK_POINT } from '@/types/common';

import useMediaQuery from '@/hooks/useMediaQuery';

type DrawerBottomModalProps = {
  children: ReactNode;
  isOpen: boolean | undefined;
  handleClose: () => void;
  dialogClass?: string;
  contentClass?: string;
  contentContainerClass?: string;
  backdropClass?: string;
  iconClassName?: string;
  isCloseIcon?: boolean;
  isCloseBackDrop?: boolean;
  isScrollContent?: boolean;
  title?: string;
  classNameTitleContainer?: string;
};

function DrawerBottomModal({
  children,
  isOpen,
  handleClose,
  dialogClass,
  contentClass,
  contentContainerClass,
  backdropClass,
  iconClassName,
  isCloseIcon,
  isCloseBackDrop = true,
  isScrollContent,
  title,
  classNameTitleContainer,
}: DrawerBottomModalProps) {
  const refDiv = useRef<HTMLDivElement>(null);
  const upMdMatch = useMediaQuery(SCREEN_BREAK_POINT.MD);

  const transitionBodyProps = useMemo(() => {
    if (upMdMatch) {
      return {
        enter: 'ease-out duration-300',
        enterFrom: 'opacity-0 scale-95',
        enterTo: 'opacity-100 scale-100',
        leave: 'ease-in duration-200',
        leaveFrom: 'opacity-100 scale-100',
        leaveTo: 'opacity-0 scale-95',
      };
    } else {
      return {
        enter: 'ease-out duration-300',
        enterFrom: 'translate-y-full',
        enterTo: 'translate-y-0',
        leave: 'ease-in duration-200',
        leaveFrom: 'translate-y-0',
        leaveTo: 'translate-y-full',
      };
    }
  }, [upMdMatch]);

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
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        initialFocus={refDiv}
        className={cn(['modal relative z-modal', dialogClass])}
        onClose={handleCloseModal}>
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
              'fixed inset-0 bg-black bg-opacity-25',
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
              'flex min-h-full items-end justify-center pt-4 text-center md:items-center',
              contentContainerClass,
            ])}>
            <div className='translate-y-full'></div>
            <Transition.Child as={Fragment} {...transitionBodyProps}>
              <Dialog.Panel
                className={cn([
                  'relative max-h-[90vh] w-full  transform overflow-hidden overflow-y-auto rounded-t-lg bg-white p-5 text-left transition-all md:max-w-[410px] md:rounded-xl',
                  contentClass,
                ])}>
                {title ? (
                  <div
                    className={cn(
                      'flex items-center justify-between border-b px-4 py-3',
                      classNameTitleContainer
                    )}>
                    <span className='text-lg font-semibold'>{title}</span>
                    {isCloseIcon && (
                      <CloseIcon
                        onClick={handleCloseModal}
                        className={cn(
                          'h-5 w-5 cursor-pointer fill-common-icon-light',
                          iconClassName
                        )}
                      />
                    )}
                  </div>
                ) : (
                  isCloseIcon && (
                    <CloseIcon
                      onClick={handleCloseModal}
                      className={cn(
                        'absolute right-4 top-4 h-5 w-5 cursor-pointer fill-common-icon-light',
                        iconClassName
                      )}
                    />
                  )
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

export default DrawerBottomModal;
