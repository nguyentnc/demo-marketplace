import cn from "classnames";

import LoadingRing, {
  LoadingProps,
  TLoadingSize,
} from "@/components/Common/Loading/LoadingRing";

import Button, { ButtonType } from "./Button";

type Props = {
  loading?: boolean;
  loadingSize?: TLoadingSize;
  loadingProps?: LoadingProps;
  isShowChildWhenLoading?: boolean;
};

function LoadingButton({
  loading,
  loadingProps,
  isShowChildWhenLoading = true,
  children,
  ...rest
}: Props & ButtonType) {
  return (
    <Button isDisabled={loading || rest.isDisabled} {...rest}>
      <div className="flex h-[1.5rem] items-center justify-center space-x-1">
        {loading && (
          <LoadingRing
            size={loadingProps?.size || "xs"}
            className={cn("!border-t-theme-black/30", loadingProps?.className, {
              "mr-1": isShowChildWhenLoading,
            })}
          />
        )}

        {(isShowChildWhenLoading || (!isShowChildWhenLoading && !loading)) && (
          <>{children}</>
        )}
      </div>
    </Button>
  );
}

export default LoadingButton;
