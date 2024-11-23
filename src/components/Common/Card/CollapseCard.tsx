"use client";
import { ArrowDownSLineIcon } from "@/components/Icons";
import cn from "classnames";
import React, { useState } from "react";
type Props = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  defaultShow?: boolean;
  isShadow?: boolean;
};

export const CollapseCard = ({
  title,
  children,
  icon,
  className,
  defaultShow = false,
  isShadow = false,
}: Props) => {
  const [isShowContent, setIsShowContent] = useState(defaultShow);
  const handleShow = () => {
    setIsShowContent(!isShowContent);
  };
  return (
    <div className={cn({ "shadow-card": isShadow }, className)}>
      <div
        className={cn(
          "flex justify-between rounded-2xl bg-theme-white p-4 delay-200",
          {
            "rounded-b-none border-b !delay-0": isShowContent,
          }
        )}
      >
        <div className=" flex space-x-2">
          {icon && <div className="flex flex-col justify-center">{icon}</div>}
          <p className="text-lg font-bold">{title}</p>
        </div>
        <div
          className="flex cursor-pointer flex-col justify-center "
          onClick={handleShow}
        >
          <ArrowDownSLineIcon
            className={cn("h-6 w-6 transition-all duration-200", {
              "rotate-180": isShowContent,
            })}
          />
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className={cn(
            "max-h-0 -translate-y-full rounded-b-2xl bg-theme-white transition-all duration-200",
            { "max-h-[999px] translate-y-0": isShowContent }
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapseCard;
