import FixedLayout from '@/layouts/FixedLayout';

export default function FixedLayoutGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FixedLayout>{children}</FixedLayout>;
}
