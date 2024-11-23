import TextField, { TextFieldProps } from './TextField';

import Radio, { RadioProps } from '../UI/Radio';

import cn from 'classnames';
import { useFormContext } from 'react-hook-form';
import FormErrorMessage from '../FormErrorMessage';
import { IFormControlGroupRadioOptions, TInputRadioValue } from '@/types/form';
export type FormGroupRadioType = {
  radioOptions: IFormControlGroupRadioOptions[];
  inputProps?: RadioProps;
  isShowError?: boolean;
  className?: string;
  radioClassName?: string;
  isBorder?: boolean;
  labelGroupRadio?: string;
} & Omit<TextFieldProps, 'id' | 'className' | 'label'>;
export function FormGroupRadio({
  labelGroupRadio,
  isShowError = true,
  inputProps = {},
  className,
  radioClassName,
  radioOptions,
  isBorder,
  ...rest
}: FormGroupRadioType) {
  const {
    formState: { errors },
    watch,
  } = useFormContext();

  const watchValue = watch(rest.name);
  function validateChecked(currentValue: string, newValue: TInputRadioValue) {
    let isValid = false;

    if (currentValue) {
      switch (typeof newValue) {
        case 'string':
        case 'number':
          isValid = newValue.toString() === currentValue.toString();
          break;
        default:
          //TODO check more options for string[]
          break;
      }
      return isValid;
    }
  }

  return (
    <div
      className={cn({
        // 'relative mb-5': isShowError,
        'flex-col space-y-2': isShowError,
      })}>
      <p className='text-neutral'>{labelGroupRadio}</p>
      <div className={cn(className)}>
        {radioOptions?.map(({ label, value, disabled }, index) => (
          <TextField
            {...rest}
            key={`${index}_${value}`}
            value={value}
            label={label}
            className={cn(radioClassName, {
              'cursor-pointer rounded-lg border px-3': isBorder,
              'border-primary': validateChecked(watchValue, value),
            })}
            isShowError={false}
            labelProps={{
              layout: 'horizontal',
              isReverse: true,
              labelClassName: cn(
                '!text-black',
                isBorder ? 'flex-1 py-3 cursor-pointer' : 'cursor-pointer',
                rest.labelProps
              ),
            }}>
            <Radio
              {...inputProps}
              disabled={disabled}
              checked={validateChecked(watchValue, value)}
            />
          </TextField>
        ))}
      </div>

      {isShowError && (
        <FormErrorMessage
          name={rest.name}
          errors={errors}
          className={cn(
            // 'absolute top-full left-0 text-[13px] pl-1 italic',
            rest.errorClassName
          )}
        />
      )}
    </div>
  );
}

export default FormGroupRadio;
