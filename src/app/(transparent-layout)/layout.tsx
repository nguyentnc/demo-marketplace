import TransparentLayout from '@/layouts/TransparentLayout';

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: 'Trải Nghiệm Du Lịch Tiết Kiệm và Đẳng Cấp',
};

export default function TransparentLayoutGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TransparentLayout>{children}</TransparentLayout>;
}
