import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  id?: string;
  className?: string;
  targetId?: string;
}

const Portal: FC<Props> = ({ children, id, className, targetId }) => {
  const container =
    (document.getElementById(`${targetId}`) as HTMLElement) ||
    (document.querySelector('body') as HTMLElement);

  return createPortal(
    <div id={id} className={className}>
      {children}
    </div>,
    container
  );
};
export default Portal;
