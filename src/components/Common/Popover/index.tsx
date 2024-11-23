'use client';
import { Popover as PopoverHeadless, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, MutableRefObject } from 'react';

import cn from 'classnames';

interface PanelRenderPropArg {
  open: boolean;
  close: (
    focusableElement?: HTMLElement | MutableRefObject<HTMLElement | null>
  ) => void;
}

type Props = {
  className?: string;
  panelClassName?: string;
  label: React.ReactNode;
  disabled?: boolean;
  forceOpen?: boolean;
  isShowArrow?: boolean;
  unmount?: boolean;
  children?: React.ReactNode | ((data: PanelRenderPropArg) => React.ReactNode);
};
export function PopoverArrow({
  children,
  className,
  label,
  disabled,
  isShowArrow = false,
  panelClassName,
  forceOpen,
  unmount = true,
}: Props) {
  return (
    <PopoverHeadless className='relative'>
      {({ close, open }) => (
        <>
          <PopoverHeadless.Button
            autoFocus={false}
            className={cn(
              'flex items-center space-x-2 focus-visible:outline-none',
              className
            )}
            disabled={disabled}>
            {label}
            {isShowArrow && (
              <ChevronDownIcon className='h-5 w-5 fill-black/50' />
            )}
          </PopoverHeadless.Button>
          <Transition
            as={unmount ? Fragment : 'div'}
            unmount={unmount}
            show={forceOpen || open}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo={cn('opacity-100 translate-y-0', {
              'relative z-10': !unmount,
            })}
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'>
            <PopoverHeadless.Panel
              unmount={unmount}
              className={cn(
                'absolute left-0 z-20 mt-2 rounded-lg bg-white',
                panelClassName
              )}>
              {({ close, open }) => (
                <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                  {typeof children === 'function'
                    ? children({ close, open })
                    : children}
                </div>
              )}
            </PopoverHeadless.Panel>
          </Transition>
        </>
      )}
    </PopoverHeadless>
  );
}

export default PopoverArrow;
