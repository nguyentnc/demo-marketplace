import { InputSize } from '@/utils/constants/ui';

export type TInputSize = (typeof InputSize)[keyof typeof InputSize];

export type TBaseInputProps = {
  isError?: boolean;
  isDirty?: boolean;
  inputSize?: TInputSize;
};
