import { Button } from "@/components/Base";
import BasicModal from "../Modal/BasicModal";

export enum EStatusNotification {
  SUCCESS,
  FAILED,
  WAITTING,
  INFOMATION,
  EMPTY,
}

export type TModalNotificationProps = {
  isShow: boolean;
  title: string;
  message: string;
  status: EStatusNotification;
  mainButtonText?: string;
  mainAction?: () => void;
  extraButtonText?: string;
  extraAction?: () => void;
};

export const defaultModalNotificationProps: TModalNotificationProps = {
  isShow: false,
  title: "",
  message: "",
  status: EStatusNotification.EMPTY,
};

const StatusIcon = {
  [EStatusNotification.SUCCESS]: (
    <img src="/assets/images/status-success.png" alt="" />
  ),
  [EStatusNotification.FAILED]: (
    <img src="/assets/images/status-failed.png" alt="" />
  ),
  [EStatusNotification.WAITTING]: (
    <img src="/assets/images/status-waiting.png" alt="" />
  ),
  [EStatusNotification.INFOMATION]: (
    <img src="/assets/images/status-information.png" alt="" />
  ),
  [EStatusNotification.EMPTY]: (
    <img src="/assets/images/status-empty.png" alt="" />
  ),
};

const ModalNotification = ({
  isShow,
  title,
  message,
  status,
  mainButtonText,
  extraButtonText,
  mainAction,
  extraAction,
}: TModalNotificationProps) => {
  return (
    <BasicModal
      open={isShow}
      footer={null}
      closable={false}
      contentClass="!max-w-[481px]"
    >
      <div className="flex flex-col space-y-10 p-8">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center">{StatusIcon[status]}</div>
          <div className="flex flex-col space-y-2">
            <div className="text-center text-lg font-bold">{title}</div>
            <div className="tex-md text-center">{message}</div>
          </div>
        </div>
        {mainButtonText && mainAction && (
          <div className="flex flex-col justify-between space-y-2">
            <Button className="w-full" onClick={() => mainAction()}>
              {mainButtonText}
            </Button>
            {extraButtonText && extraAction && (
              <Button
                className="w-full"
                variant="outline"
                onClick={() => extraAction()}
              >
                {extraButtonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </BasicModal>
  );
};

export default ModalNotification;
