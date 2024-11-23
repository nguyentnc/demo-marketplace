import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
};

function FormBox({ children, title }: Props) {
  return (
    <div className='mx-auto mt-[1px] max-w-[400px] rounded-lg bg-white p-8 px-6 md:mt-10 md:px-8 md:shadow-box-login'>
      <h2 className='text-center text-[23px] font-semibold leading-[39px] text-black md:text-[33px]'>
        {title}
      </h2>
      {children}
    </div>
  );
}

export default FormBox;
