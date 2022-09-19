export const drop = {
  hidden: {
    y: '-100vh',
    opacity: 0.5,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.3,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};
export const zoom = {
  hidden: {
    scale: 0,
    opacity: 0.9,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 28,
      stiffness: 600,
    },
  },
  exit: {
    scale: 0,
    opacity: 0.7,
  },
};
