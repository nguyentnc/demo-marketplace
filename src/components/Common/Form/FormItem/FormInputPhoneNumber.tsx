import { useEffect } from 'react';
import InputPhoneNumber, {
  InputPhoneNumberProps,
} from '../UI/InputPhoneNumber';
import TextField, { TextFieldProps } from './TextField';
// import { SelectOptionItem } from '@/types/common';
import { useCountry } from '@/hooks/stores';
import { IP_COUNTRY_DEFAULT, IP_COUNTRY_KEY } from '@/utils/constants/general';
import { getCookie } from '@/utils/function';
import { useFormContext } from 'react-hook-form';

export function FormInputPhoneNumber({
  inputProps,
  defaultPhoneCode,
  placeholderCode,
  placeholderPhone,
  ...rest
}: Omit<TextFieldProps, 'placeholder'> & {
  inputProps?: Partial<Omit<InputPhoneNumberProps, 'onChange'>>;
  defaultPhoneCode?: boolean;
  placeholderCode?: InputPhoneNumberProps['placeholderCode'];
  placeholderPhone?: InputPhoneNumberProps['placeholderPhone'];
}) {
  const {
    trigger,
    formState: { defaultValues },
    setValue,
  } = useFormContext();
  const { phoneCodeOptions, formatPhoneCodeValue } = useCountry();

  useEffect(() => {
    if (phoneCodeOptions.length && defaultPhoneCode) {
      const defaultValue = defaultValues?.[rest.name];
      if (!defaultValue?.phoneCode) {
        let ipCountry = getCookie(IP_COUNTRY_KEY);
        // console.log('DEBUG:ipCountry', ipCountry);
        if (!ipCountry || ipCountry === 'default') {
          ipCountry = IP_COUNTRY_DEFAULT;
        }
        const defaultPhoneValue = formatPhoneCodeValue(ipCountry);
        setValue(`${rest.name}.phoneCode`, defaultPhoneValue);
        trigger(`${rest.name}.phoneCode`);
      }
    }
  }, [phoneCodeOptions]);

  return (
    <TextField {...rest}>
      <InputPhoneNumber
        {...inputProps}
        phoneCodeOptions={phoneCodeOptions}
        placeholderCode={placeholderCode}
        placeholderPhone={placeholderPhone}
      />
    </TextField>
  );
}

export default FormInputPhoneNumber;
