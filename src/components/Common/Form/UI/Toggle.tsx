import { PassPropsType } from "@/components/Base/Form";
import { Switch } from "@headlessui/react";
import cn from "classnames";

export type ToggleProps = PassPropsType<boolean> & {
  className?: string;
  disabled?: boolean;
};

export function Toggle({
  value,
  onChange,
  disabled = false,
  className,
}: ToggleProps) {
  return (
    <Switch
      checked={value}
      onChange={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full ",
        { "bg-primary": value, "bg-theme-black/20": !value },
        className
      )}
      disabled={disabled}
    >
      <span
        className={`${
          value ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
