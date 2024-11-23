import cn from 'classnames';

export const LOADING_SIZE = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export type TLoadingSize = (typeof LOADING_SIZE)[keyof typeof LOADING_SIZE];
const loadingSize = {
  [LOADING_SIZE.XS]: 'lds-ring--xs w-4 h-4 min-w-[16px] min-h-[16px]',
  [LOADING_SIZE.SM]: 'lds-ring--sm w-5 h-5 min-w-[20px] min-h-[20px]',
  [LOADING_SIZE.MD]: 'lds-ring--md w-7 h-7 min-w-[28px] min-h-[28px]',
  [LOADING_SIZE.LG]: 'lds-ring--lg w-10 h-10 min-w-[40px] min-h-[40px]',
  [LOADING_SIZE.XL]: 'lds-ring--xl w-14 h-14 min-w-[56px] min-h-[56px]',
};

export type LoadingProps = {
  className?: string;
  size?: TLoadingSize;
};

export function LoadingRing({
  className,
  size = LOADING_SIZE.LG,
}: LoadingProps) {
  return (
    <div className={cn([className, 'lds-ring', loadingSize[size]])}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingRing;
