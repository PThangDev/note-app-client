import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './ModalFormNote.module.scss';
import Modal from 'src/components/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const cx = classnames.bind(styles);

const ModalFormNote: FC<Props> = ({ isOpen = false, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={cx('wrapper')}>
        <h3 className={cx('heading')}>Create Note</h3>
        <form></form>
      </div>
    </Modal>
  );
};

export default ModalFormNote;
