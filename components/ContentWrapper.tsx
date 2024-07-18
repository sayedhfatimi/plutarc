const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='border bg-white/80 p-1 shadow-sm dark:bg-slate-900/50'>
      {children}
    </div>
  );
};

export default ContentWrapper;
