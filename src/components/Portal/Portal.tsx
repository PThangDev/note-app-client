import { FC, ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  id?: string;
  className?: string;
  targetId?: string;
}

const createWrapperAndAppendToBody = (targetId: string) => {
  if (!targetId) {
    return document.querySelector('body') as HTMLElement;
  }
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', targetId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

const Portal: FC<Props> = ({ children, id, className, targetId = '' }) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(targetId || '') as HTMLElement;
    // if element is not found with targetId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      element = createWrapperAndAppendToBody(targetId);
    }
    setWrapperElement(element);
  }, [targetId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};
export default Portal;
