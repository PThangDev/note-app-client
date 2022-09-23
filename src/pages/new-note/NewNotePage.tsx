import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { FormNote } from 'src/components/Form';
import styles from './NewNotePage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const NewNotePage: FC<Props> = (props) => {
  return (
    <>
      <Helmet>
        <title>Create a new note</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <FormNote onClose={() => {}} />
      </div>
    </>
  );
};

export default NewNotePage;
