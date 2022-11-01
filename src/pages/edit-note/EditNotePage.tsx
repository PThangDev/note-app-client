import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { FormNote } from 'src/components/Form';
import useGetNoteDetail from 'src/hooks/useGetNoteDetail';
import styles from './EditNotePage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const EditNotePage: FC<Props> = (props) => {
  const { data } = useGetNoteDetail();

  return (
    <>
      <Helmet>
        <title>Edit note</title>
      </Helmet>
      <div className={cx('wrapper')}>{data && <FormNote data={data} />}</div>
    </>
  );
};

export default EditNotePage;
