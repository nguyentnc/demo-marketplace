'use client';
import React, { useState } from 'react';
import Collapse from '@/components/Common/Collapse';
import { ArrowDownSFillIcon } from '@/components/Icons';
import Link from 'next/link';

type Props = {
  className?: string;
  category: string;
  links: {
    label: string;
    url: string;
  }[];
};

const CollapseCategory = ({ category, links, className }: Props) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <Collapse
      className={className}
      isShow={isShow}
      panel={
        <div className='flex flex-col space-y-2 pt-4'>
          {links.map((item, index) => {
            return (
              <Link href={item.url} key={index}>
                {item.label}
              </Link>
            );
          })}
        </div>
      }>
      <div
        className='flex cursor-pointer items-center justify-between'
        onClick={() => setIsShow((pre) => !pre)}>
        <span className='text-md font-medium'>{category}</span>
        <ArrowDownSFillIcon className='h-6 w-6 shrink-0' />
      </div>
    </Collapse>
  );
};

export default CollapseCategory;
