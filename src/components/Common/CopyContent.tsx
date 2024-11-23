import { copyTextToClipboard } from '@/utils/helpers';
import { CheckBoxMultipleBlankLineIcon, CheckLineIcon } from '../Icons';
import { useState } from 'react';
import cn from 'classnames';

type TCopyContentProps = {
  text: string;
  classNames?: string;
};

export default function CopyContent({ text, classNames }: TCopyContentProps) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    copyTextToClipboard(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  return (
    <div
      className={cn(
        'flex cursor-pointer justify-center space-x-2 rounded-xl border border-dashed border-theme-black/20 bg-theme-black/5 p-3',
        classNames
      )}
      onClick={handleCopy}>
      <p className='line-clamp-1'>{text}</p>
      <div className='shrink-0 cursor-pointer'>
        {isCopied ? (
          <CheckLineIcon className='h-6 w-6 cursor-not-allowed' />
        ) : (
          <CheckBoxMultipleBlankLineIcon className='h-6 w-6' />
        )}
      </div>
    </div>
  );
}
