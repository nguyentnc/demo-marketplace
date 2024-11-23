import { toBase64 } from './function';

const shimmer = (
  w: number | string | undefined,
  h: number | string | undefined
) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="transparent" offset="20%" />
      <stop stop-color="#00000029" offset="50%" />
      <stop stop-color="transparent" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#00000029" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const genSkeletonUrl = (
  w: number | string | undefined,
  h: number | string | undefined
) => {
  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
};
