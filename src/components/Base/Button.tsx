import cn from 'classnames';
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const ButtonTheme = {
  PRIMARY: 'primary',
  WHITE: 'white',
  BLACK: 'black',
} as const;

type TButtonTheme = (typeof ButtonTheme)[keyof typeof ButtonTheme];

const ButtonSize = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type TButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

const ButtonRound = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  FULL: 'full',
} as const;

type TButtonRound = (typeof ButtonRound)[keyof typeof ButtonRound];

const ButtonVariant = {
  SOLID: 'solid',
  OUTLINE: 'outline',
  GHOST: 'ghost',
} as const;

type TButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

const buttonStyleDefault = {
  [ButtonVariant.SOLID]: 'border border-solid',
  [ButtonVariant.OUTLINE]: 'border border-solid ',
  [ButtonVariant.GHOST]: 'border-none bg-transparent',
};

const buttonStyleByTheme = {
  [ButtonVariant.SOLID]: {
    [ButtonTheme.PRIMARY]:
      'bg-primary border-primary text-theme-white hover:bg-primary-4 active:bg-primary-6',
    [ButtonTheme.WHITE]:
      'bg-neutral-white border-neutral-white text-neutral-100 hover:bg-neutral-10 active:bg-neutral-20',
    [ButtonTheme.BLACK]:
      'bg-theme-black text-theme-white hover:bg-neutral-100 active:bg-neutral-90',
  },
  [ButtonVariant.OUTLINE]: {
    [ButtonTheme.PRIMARY]:
      'border-primary text-primary hover:border-primary-4 active:border-primary-6',
    [ButtonTheme.WHITE]:
      'border-neutral-100 text-neutral-100 hover:border-neutral-100 active:border-neutral-90',
    [ButtonTheme.BLACK]: 'border-neutral-white text-neutral-white',
  },
  [ButtonVariant.GHOST]: {
    [ButtonTheme.PRIMARY]:
      'text-primary hover:text-primary-4 active:text-primary-6',
    [ButtonTheme.WHITE]: 'text-neutral-100 ',
    [ButtonTheme.BLACK]: '',
  },
};

const buttonStyleActiveByTheme = {
  [ButtonVariant.SOLID]: {
    [ButtonTheme.PRIMARY]: 'bg-primary-6',
    [ButtonTheme.WHITE]: 'bg-neutral-20',
    [ButtonTheme.BLACK]: 'bg-neutral-90',
  },
  [ButtonVariant.OUTLINE]: {
    [ButtonTheme.PRIMARY]: 'border-primary-6',
    [ButtonTheme.WHITE]: 'border-neutral-90',
    [ButtonTheme.BLACK]: '',
  },
  [ButtonVariant.GHOST]: {
    [ButtonTheme.PRIMARY]: 'bg-transparent',
    [ButtonTheme.WHITE]: 'bg-transparent',
    [ButtonTheme.BLACK]: '',
  },
};

const buttonSize = {
  [ButtonSize.SM]: 'py-1 px-2 text-sm',
  [ButtonSize.MD]: 'py-2 px-3 text-md',
  [ButtonSize.LG]: 'py-3 px-4 text-md',
};

type Props = {
  variant?: TButtonVariant;
  size?: TButtonSize;
  rounded?: TButtonRound;
  isDisabled?: boolean;
  isActive?: boolean;
  fullWidth?: boolean;
  uppercase?: boolean;
  className?: string;
  arrowClassName?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  theme?: TButtonTheme;
};

export type ButtonType = Props &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({
  children,
  className,
  arrowClassName,
  variant = ButtonVariant.SOLID,
  fullWidth = false,
  uppercase = false,
  size = ButtonSize.MD,
  rounded = ButtonRound.LG,
  isDisabled,
  isActive,
  theme = ButtonTheme.PRIMARY,
  prefixIcon,
  suffixIcon,
  type = 'button',
  ...rest
}: ButtonType) => {
  return (
    <button
      disabled={isDisabled}
      className={cn(
        `rounded-${rounded} inline-flex items-center justify-center whitespace-nowrap text-center text-base duration-150`,
        'disabled:pointer-events-none disabled:border-transparent disabled:bg-theme-white-variant-3 disabled:bg-none disabled:text-theme-black/30 disabled:hover:shadow-none',
        {
          'w-full': fullWidth,
          uppercase: uppercase,
          [buttonStyleDefault[variant]]: true,
          [buttonStyleByTheme[variant][theme]]: true,
          [buttonSize[size]]: true,
          [buttonStyleActiveByTheme[variant][theme]]: isActive,
          [className || '']: !!className,
          'flex items-center space-x-2': suffixIcon || prefixIcon,
          '!max-h-14': variant === ButtonVariant.OUTLINE,
        }
      )}
      type={type}
      {...rest}>
      {prefixIcon}
      {typeof children === 'string' ? (
        <span
          className={cn('text-inherit', {
            'flex-1': suffixIcon,
          })}>
          {children}
        </span>
      ) : (
        children
      )}
      {suffixIcon}
    </button>
  );
};

export default Button;
