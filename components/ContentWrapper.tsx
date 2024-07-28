import { cn } from '@/lib/utils';

const ContentWrapper = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <main
      className={cn(
        'border bg-white/50 p-1 shadow-sm dark:bg-slate-900/50',
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
};

export default ContentWrapper;
