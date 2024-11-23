import {
  ToastError,
  ToastInfo,
  ToastSuccess,
  ToastWarning,
} from '@/components/Base/Toast';
import { FC } from 'react';

import toast, { ToastOptions } from 'react-hot-toast';
import { ToastProps, ToastType } from '@/types/toast';

export const useToast = () => {
  function handleToast(type: ToastType) {
    let RenderElement: FC<ToastProps>;
    const toastOption: ToastOptions = {};
    switch (type) {
      case 'success':
        RenderElement = ToastSuccess;
        toastOption.duration = 2000;

        break;

      case 'error':
        RenderElement = ToastError;
        toastOption.duration = 4000;

        break;

      case 'info':
        RenderElement = ToastInfo;
        toastOption.duration = 4000;
        break;

      case 'warning':
        RenderElement = ToastWarning;
        toastOption.duration = 4000;
        break;

      default:
        break;
    }

    return function (message: string, customOpts?: ToastOptions) {
      if (!message) {
        return;
      }

      if (RenderElement) {
        toast.custom(
          () => (
            <div className='inline-flex max-w-md rounded-lg bg-white shadow-card'>
              <RenderElement
                message={message}
                className='flex w-full items-center rounded-lg p-4 md:w-auto md:min-w-[200px]'
              />
            </div>
          ),
          { ...toastOption, ...customOpts }
        );
      } else {
        // blank toast
        toast(message);
      }
    };
  }

  return {
    success: handleToast('success'),
    error: handleToast('error'),
    info: handleToast('info'),
    warning: handleToast('warning'),
  };
};

export default useToast;
