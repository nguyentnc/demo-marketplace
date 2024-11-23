import { InputDateFromTo, InputDateFromToProps } from "../UI/InputDateFromTo";
import TextField, { TextFieldProps } from "./TextField";

export function FormInputDateFromTo({
  inputProps = {},
  ...rest
}: TextFieldProps & {
  inputProps?: Partial<Omit<InputDateFromToProps, "onChange">>;
  // inputProps?: Pick<
  // InputDateFromToProps,
  //   'className' | 'selectButtonClassName' | 'disabled' | 'inputSize'
  // >;
}) {
  return (
    <TextField {...rest}>
      <InputDateFromTo {...inputProps} />
    </TextField>
  );
}

export default FormInputDateFromTo;
