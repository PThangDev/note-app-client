import { motion } from 'framer-motion';
import { CSSProperties, FC, ReactNode, useLayoutEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
  closeWhenPressEsc?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick: () => void;
  onEscape: () => void;
}

const Backdrop: FC<Props> = ({
  children,
  className = '',
  closeWhenPressEsc = true,
  style = {},
  onClick,
  onEscape,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const modals = document.querySelectorAll('.backdrop');
    if (closeWhenPressEsc) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onEscape();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [closeWhenPressEsc, onClick, onEscape]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`backdrop ${Boolean(className) ? className : ''}`}
      style={style}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </motion.div>
  );
};
export default Backdrop;
