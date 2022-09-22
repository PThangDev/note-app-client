import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import NoteContainer from 'src/containers/NoteContainer';
import useGetTopics from 'src/hooks/useGetTopics';

import styles from './HomePage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const HomePage: FC<Props> = (props) => {
  const { data, isLoading } = useGetTopics();
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Note App - PThangDev"></meta>
      </Helmet>
      <div className={cx('wrapper')}>
        {data.map((topic) => {
          if (topic.notes.length) {
            return (
              <NoteContainer
                key={topic._id}
                header={{ text: topic.name, color: topic.background, to: `/topics/${topic._id}` }}
                notes={topic.notes}
                loadingItems={4}
                isLoading={isLoading}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default HomePage;
