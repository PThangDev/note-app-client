import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode, useId } from 'react';

import Portal from '../Portal';
import Backdrop from './Backdrop';
import * as options from './options';
import './styles.css';

interface Props {
  isOpen: boolean;
  closeWhenClickOnOverlay?: boolean;
  closeWhenPressEsc?: boolean;
  children?: ReactNode;
  animate?: 'zoom' | 'drop';
  heading?: string;
  className?: string;
  overlayClassName?: string;

  onClose: () => void;
}

const Modal: FC<Props> = ({
  children,
  isOpen,
  closeWhenClickOnOverlay = false,
  closeWhenPressEsc = true,
  animate = 'zoom',
  heading = '',
  className = '',
  overlayClassName = '',
  onClose,
}) => {
  const id = useId();
  return (
    <Portal id={id} targetId="no-root">
      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {isOpen && (
          <Backdrop
            className={overlayClassName}
            closeWhenPressEsc={closeWhenPressEsc}
            onClick={() => (closeWhenClickOnOverlay ? onClose() : null)}
            onEscape={() => (closeWhenPressEsc ? onClose() : null)}
          >
            {/* Prevent clicks on modal from bubbling to backdrop */}
            <motion.div
              className={`modal ${Boolean(className) ? className : ''}`}
              variants={options[animate]}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              tabIndex={1}
            >
              <span className="modal-btn-close" onClick={onClose}></span>
              <h3 className="modal-heading">{heading}</h3>
              <div className="modal-content">{children}</div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Portal>
  );
};
export default Modal;
