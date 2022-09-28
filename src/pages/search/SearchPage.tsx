import classnames from 'classnames/bind';
import qs from 'query-string';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import NoteContainer from 'src/containers/NoteContainer';
import useGetNotes from 'src/hooks/useGetNotes';
import styles from './SearchPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const SearchPage: FC<Props> = (props) => {
  const location = useLocation();
  const params = qs.parse(location.search);

  const { data, isLoading } = useGetNotes({ params: { q: params.q as string } });

  return (
    <>
      <Helmet>
        <title>{isLoading ? 'Searching...' : 'Search Results'}</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <NoteContainer
          isLoading={isLoading}
          header={{ text: 'Results' }}
          notes={data}
          loadingItems={8}
        />
      </div>
    </>
  );
};

export default SearchPage;
