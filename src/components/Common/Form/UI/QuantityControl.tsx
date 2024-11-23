import Button, { TButtonSize } from "@/components/Base/Button";
import { PassPropsType } from "@/components/Base/Form";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { ForwardedRef, forwardRef } from "react";

type Props = {
  onChange?: (value: number) => void;
  size?: TButtonSize;
  maxValue?: number;
  minValue?: number;
  disableIncrease?: boolean;
  disableDecrease?: boolean;
  onDisableIncreaseClick?: () => void;
  onDisableDecreaseClick?: () => void;
} & PassPropsType<number>;

function QuantityControlInner(
  {
    size,
    maxValue = Infinity,
    onChange,
    value: quantity = 0,
    minValue = 0,
    name,
    disableDecrease = false,
    disableIncrease = false,
    onDisableIncreaseClick,
    onDisableDecreaseClick,
    ...rest
  }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="inline-flex items-center space-x-1">
      <div
        onClick={() => {
          if (disableDecrease || quantity === minValue) {
            onDisableDecreaseClick?.();
          }
        }}
      >
        <Button
          type="button"
          variant="outline"
          theme="primary"
          size={size}
          className="!p-1.5 disabled:!border-theme-black/10 disabled:!bg-theme-black/5"
          disabled={disableDecrease || quantity === minValue}
          onClick={() => {
            onChange?.(quantity - 1);
          }}
        >
          <MinusIcon width={20} height={20} />
        </Button>
      </div>

      <span className="w-10 shrink-0 text-center">{quantity}</span>
      <input {...rest} ref={ref} name={name} value={quantity} type="hidden" />
      <div
        onClick={() => {
          if (disableIncrease || quantity >= maxValue) {
            onDisableIncreaseClick?.();
          }
        }}
      >
        <Button
          type="button"
          variant="outline"
          theme="primary"
          size={size}
          className="!p-1.5 disabled:!border-theme-black/10"
          onClick={() => {
            onChange?.(quantity + 1);
          }}
          disabled={disableIncrease || quantity >= maxValue}
        >
          <PlusIcon width={20} height={20} />
        </Button>
      </div>
    </div>
  );
}

export const QuantityControl = forwardRef(QuantityControlInner);
QuantityControl.displayName = "QuantityControl";

export default QuantityControl;
