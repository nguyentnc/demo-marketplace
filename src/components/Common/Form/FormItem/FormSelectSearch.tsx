import SelectSearch, {
  SelectOptionItemCombine,
  SelectSearchProps,
} from '../UI/SelectSearch';
import TextField, { TextFieldProps } from './TextField';

export function FormSelectSearch({
  selectOptions,
  inputProps = {},

  ...rest
}: TextFieldProps & {
  inputProps?: Pick<
    SelectSearchProps,
    | 'className'
    | 'disabled'
    | 'inputSize'
    | 'inputSearchClassName'
    | 'optionSelectSearchClassName'
    | 'optionGroupSelectSearchClassName'
    | 'isOnlyValue'
    | 'isRoot'
    | 'renderLabel'
    | 'displayValue'
    | 'compareFunc'
  >;
  selectOptions: SelectSearchProps['selectOptions'];
}) {
  return (
    <TextField {...rest}>
      {({ value, ...rest }) => (
        <SelectSearch
          {...inputProps}
          {...rest}
          value={value as SelectOptionItemCombine}
          selectOptions={selectOptions}
        />
      )}
    </TextField>
  );
}

export default FormSelectSearch;
