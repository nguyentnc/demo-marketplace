import { ImgHTMLAttributes } from "react";

type Props = {
  src: string;
};

function BannerSection({
  src,
  alt,
  ...rest
}: Props & ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div>
      <img src={src} alt={alt} {...rest} />
    </div>
  );
}

export default BannerSection;
