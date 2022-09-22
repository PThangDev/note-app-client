import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { FormNote } from 'src/components/Form';
import Modal from 'src/components/Modal';
import NoteContainer from 'src/containers/NoteContainer';
import useGetNotes from 'src/hooks/useGetNotes';
import { Button } from 'src/themes/UI';
import styles from './NotesPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const NotesPage: FC<Props> = (props) => {
  const { data, isLoading, pagination } = useGetNotes({ params: { is_trash: false } });

  const [isOpenFormNote, setIsOpenFormNote] = useState<boolean>(false);

  const handleCloseFormNote = () => {
    setIsOpenFormNote(false);
  };

  return (
    <>
      <Helmet>
        <title>Notes</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('actions')}>
          <Button
            icon={<FontAwesomeIcon icon={faCirclePlus} />}
            onClick={() => setIsOpenFormNote(true)}
          >
            Create a new note
          </Button>
        </div>
        <NoteContainer notes={data} isLoading={isLoading} />
      </div>
      {/* Modal */}
      <Modal isOpen={isOpenFormNote} onClose={handleCloseFormNote} closeWhenClickOnOverlay>
        <FormNote onClose={handleCloseFormNote} />
      </Modal>
    </>
  );
};

export default NotesPage;
