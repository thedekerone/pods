import React, { type ReactNode } from 'react';
import clsx from 'clsx';

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

const WidgetWrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return (
    <div className={clsx('bg-white shadow-lg p-4 rounded-lg', className)}>
      {children}
    </div>
  );
};

export default WidgetWrapper;
