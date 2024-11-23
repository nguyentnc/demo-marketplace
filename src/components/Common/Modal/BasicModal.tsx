import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';

import { CloseIcon } from '@/components/Icons';
import { Fragment, ReactNode, useRef } from 'react';

import Button from '@/components/Base/Button';

export type BasicModalProps = {
  children: ReactNode;
  open?: boolean;
  okText?: string;
  okButtonClass?: string;
  cancelText?: string;
  cancelButtonClass?: string;
  onOk?: () => void;
  onCancel?: () => void;
  header?: ReactNode;
  footer?: ReactNode[] | null;
  dialogClass?: string;
  contentClass?: string;
  contentContainerClass?: string;
  backdropClass?: string;
  closable?: boolean;
  closeIcon?: ReactNode;
  isScrollContent?: boolean;
  headerClassname?: string;
};

export const BasicModal = ({
  children,
  open = false,
  okText,
  okButtonClass,
  cancelText,
  cancelButtonClass,
  onOk,
  onCancel,
  header,
  footer,
  dialogClass,
  contentClass,
  contentContainerClass,
  backdropClass,
  closable = true,
  closeIcon,
  isScrollContent,
  headerClassname,
}: BasicModalProps) => {
  const refDiv = useRef<HTMLDivElement>(null);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        initialFocus={refDiv}
        className={cn(['modal relative z-modal', dialogClass])}
        onClose={() => closable && onCancel?.()}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div
            className={cn(['fixed inset-0 bg-theme-black/40', backdropClass])}
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
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel
                className={cn([
                  'w-full max-w-full transform overflow-hidden rounded-xl bg-theme-white text-left shadow-xl transition-all md:max-w-xl',
                  contentClass,
                ])}>
                {/* Modal header */}
                <div
                  className={cn(
                    'flex  items-center justify-between ',
                    { 'min-h-[32px] border-b  p-4': header },
                    headerClassname
                  )}>
                  {header && <div className='text-lg font-bold'>{header}</div>}

                  {closable && (
                    <div onClick={onCancel}>
                      {closeIcon ? (
                        closeIcon
                      ) : (
                        <CloseIcon className='h-6 w-6 cursor-pointer text-theme-black' />
                      )}
                    </div>
                  )}
                </div>

                {/* Modal body */}
                <div>{children}</div>

                {/* Modal footer */}
                {/* Use footer={null} for hidden modal footer */}
                {footer !== null && (
                  <div className='space-x-2 p-4 text-right'>
                    {footer ? (
                      footer
                    ) : (
                      <>
                        <Button
                          className={cancelButtonClass}
                          variant='outline'
                          size='sm'
                          rounded='sm'
                          onClick={onCancel}>
                          {cancelText ? cancelText : 'Hủy'}
                        </Button>
                        <Button
                          className={okButtonClass}
                          variant='solid'
                          size='sm'
                          rounded='sm'
                          onClick={onOk}>
                          {okText ? okText : 'Ok'}
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        {/* This ref cheating disable auto focus element when dialog open */}
        <div ref={refDiv} className='invisible'></div>
      </Dialog>
    </Transition>
  );
};

export default BasicModal;
