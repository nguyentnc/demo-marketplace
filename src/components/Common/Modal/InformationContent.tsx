import LoadingButton from "@/components/Base/LoadingButton";
import { InformationFillIcon } from "@/components/Icons";
import cn from "classnames";

const InformationType = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
} as const;

type TInformationType = (typeof InformationType)[keyof typeof InformationType];

type Props = {
  type: TInformationType;
  title?: string;
  content?: JSX.Element | string;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  isLoadingOk?: boolean;
  isLoadingCancel?: boolean;
  disableOk?: boolean;
  disableCancel?: boolean;
};

export const InformationContent = ({
  type,
  content,
  title,
  cancelText,
  okText,
  onCancel,
  onOk,
  isLoadingOk = false,
  isLoadingCancel = false,
  disableOk = false,
  disableCancel = false,
}: Props) => {
  return (
    <div className=" w-[340px] px-6  sm:w-[384px]">
      <div className="flex w-full flex-col items-center space-y-4 py-4">
        <div className="px-10 py-2">
          <InformationFillIcon
            className={cn("h-20 w-20", {
              "text-common-success": type === InformationType.SUCCESS,
              "text-common-info": type === InformationType.INFO,
              "text-semantic-warning": type === InformationType.WARNING,
              "text-common-error": type === InformationType.ERROR,
            })}
          />
        </div>
        <div className="flex w-full flex-col space-y-2 text-center">
          {title && <span className="text-lg font-semibold">{title}</span>}
          {typeof content === "string" ? <span>{content}</span> : content}
        </div>
      </div>
      <div className="flex flex-col-reverse gap-3 pb-6 pt-3 sm:flex-row">
        {cancelText && onCancel && (
          <LoadingButton
            variant="outline"
            onClick={onCancel}
            className="min-w-1/2 flex-1"
            disabled={disableCancel || isLoadingCancel}
            loading={isLoadingCancel}
          >
            {cancelText}
          </LoadingButton>
        )}
        {okText && onOk && (
          <LoadingButton
            onClick={onOk}
            className="min-w-1/2 flex-1"
            disabled={disableOk || isLoadingOk}
            loading={isLoadingOk}
          >
            {okText}
          </LoadingButton>
        )}
      </div>
    </div>
  );
};

export default InformationContent;
