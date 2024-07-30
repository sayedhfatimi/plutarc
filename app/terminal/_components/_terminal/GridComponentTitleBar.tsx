import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import { removeComponent } from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import type React from 'react';
import type { Layout } from 'react-grid-layout';
import { LuX } from 'react-icons/lu';

const GridComponentTitleBar = ({
  item,
  children,
}: { item: Layout; children?: React.ReactNode }) => {
  const ticker = useAppSelector((state) => state.userContext.terminal.ticker);
  const dispatch = useAppDispatch();
  return (
    <div className='drag flex w-full cursor-move items-center justify-between border-b bg-secondary px-1 text-muted-foreground backdrop-blur-sm hover:bg-background'>
      {children ? children : <span>{`${item.i}: ${ticker}`}</span>}
      <LuX
        className='noDrag cursor-pointer hover:bg-background dark:hover:bg-slate-700'
        size={ICON_SIZE_SMALL}
        onClick={() => dispatch(removeComponent(item))}
      />
    </div>
  );
};

export default GridComponentTitleBar;
