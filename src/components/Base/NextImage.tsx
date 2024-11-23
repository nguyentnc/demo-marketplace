'use client';
import Image, { ImageProps } from 'next/image';
import { memo, useState } from 'react';

import { genSkeletonUrl } from '@/utils/loading';

const noImagePath = '/assets/images/no-image-icon.webp';

function NextImage({ alt, width, height, fill, ...props }: ImageProps) {
  const [src, setSrc] = useState(props.src || noImagePath);

  function onErrorImage() {
    setSrc(noImagePath);
  }

  // const unOptimized = typeof src === 'string' && isURL(src);

  if (fill) {
    return (
      <Image {...props} src={src} alt={alt} onErrorCapture={onErrorImage} />
    );
  }

  return (
    <Image
      // className='bg-white'
      {...props}
      width={width || 100}
      height={height || 100}
      src={src}
      alt={alt}
      onErrorCapture={onErrorImage}
      placeholder='blur'
      blurDataURL={genSkeletonUrl(width, height)}
    />
  );
}

export default memo(NextImage);
