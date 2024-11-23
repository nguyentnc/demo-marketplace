import { FormItem, FormItemProps } from "@/components/Base/Form";
import cn from "classnames";
import { useId } from "react";
import { useController, useFormContext } from "react-hook-form";
import FormErrorMessage from "../FormErrorMessage";
import LabelInput, { LabelInputProps } from "../LabelInput";

export type TextFieldProps = {
  className?: string;
  errorClassName?: string;
  isShowError?: boolean;
  label?: string | JSX.Element;
  labelProps?: Partial<LabelInputProps>;
} & FormItemProps;

export function TextField({
  children,
  className = "flex-1",
  isShowError = true,
  rules,
  name,
  errorClassName,
  label,
  labelProps,

  ...rest
}: TextFieldProps) {
  const useIdValue = useId();
  const id = rest.id || useIdValue;
  const { control, register } = useFormContext();
  const {
    fieldState: {
      // isTouched, isDirty, error
    },
    formState: {
      // touchedFields,
      // dirtyFields,
      // defaultValues,
      // isSubmitted,
      // isSubmitSuccessful,
      // isSubmitting,
      // submitCount,
      // isValid,
      // isValidating,
      errors,
    },
  } = useController({
    name,
    control,
    rules,
  });

  const formItem = (
    <FormItem
      {...register(name, {
        ...rules,
      })}
      {...rest}
      id={id}
      name={name}
      rules={rules}
    >
      {children}
    </FormItem>
  );
  return (
    <div
      className={cn("", className, {
        // 'relative mb-5': isShowError,
        "relative flex-col space-y-2": isShowError,
      })}
    >
      {label ? (
        <LabelInput
          {...labelProps}
          label={label}
          labelProps={{
            htmlFor: `${id}`,
            ...labelProps?.labelProps,
          }}
        >
          {formItem}
        </LabelInput>
      ) : (
        formItem
      )}
      {isShowError && (
        <FormErrorMessage
          name={name}
          errors={errors}
          className={cn(
            // 'absolute top-full left-0 text-[13px] pl-1 italic',
            errorClassName
          )}
        />
      )}
    </div>
  );
}

export default TextField;
