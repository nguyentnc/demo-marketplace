import { PassPropsType } from '@/components/Base/Form';
import { TBaseInputProps } from '@/types/ui';
import { SUPPORT_FILES } from '@/utils/constants/general';
import { InputSize } from '@/utils/constants/ui';
import { generateUUID } from '@/utils/function';
import cn from 'classnames';
import { ChangeEvent, InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export type TInputUpload = {
  fileId: string;
  fileInfo?: File;
  url?: string;
};

export type InputUploadProps = {
  renderInput?: (params: {
    children: JSX.Element;
    value: TInputUpload[];
  }) => ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> &
  TBaseInputProps &
  PassPropsType<TInputUpload[]>;

const InputUpload = forwardRef<HTMLInputElement, InputUploadProps>(
  (
    {
      className,
      isError,
      isDirty,
      inputSize = InputSize.MD,
      renderInput,
      value,
      accept = SUPPORT_FILES.join(', '),
      onChange,
      ...rest
    },
    ref
  ) => {
    function handleChangeFile(event: ChangeEvent<HTMLInputElement>) {
      try {
        if (event.target?.files?.length) {
          const newFileSelected: TInputUpload[] = Array.from(
            event.target?.files || []
          ).map((file) => {
            return {
              fileId: generateUUID(),
              fileInfo: file,
              url: URL.createObjectURL(file),
            };
          });

          if (rest.multiple) {
            onChange?.([...(value || []), ...newFileSelected]);
          } else {
            onChange?.([newFileSelected[0]]);
          }
        }
      } catch (error) {
        console.error('UPLOAD_FILE_ERROR');
      }

      // event.target.value = '';
    }

    const InputItem = (
      <input
        {...rest}
        onChange={handleChangeFile}
        accept={accept}
        ref={ref}
        className={cn(
          `base-input base-input-${inputSize}`,
          {
            error: isError,
            hidden: !!renderInput,
          },
          className
        )}
        type='file'
      />
    );

    if (renderInput) {
      return renderInput({
        children: InputItem,
        value: value || [],
      });
    }

    return InputItem;
    // return (
    //   <input
    //     {...rest}
    //     onChange={handleChangeFile}
    //     accept={accept}
    //     ref={ref}
    //     className={cn(
    //       `base-input base-input-${inputSize}`,
    //       {
    //         error: isError,
    //       },
    //       className
    //     )}
    //     type='file'
    //   />
    // );
  }
);

InputUpload.displayName = 'InputUpload';
export default InputUpload;
