import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Empty from 'src/components/Empty';

import { routePaths } from 'src/configs';
import NoteContainer from 'src/containers/NoteContainer';
import useGetNoteOthers from 'src/hooks/useGetNoteOthers';
import useGetNotesPinned from 'src/hooks/useGetNotesPinned';
import useGetTopics from 'src/hooks/useGetTopics';
import styles from './HomePage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const HomePage: FC<Props> = (props) => {
  const { data, isLoading } = useGetTopics();
  const notesPinned = useGetNotesPinned();
  const noteOthers = useGetNoteOthers();

  const renderEmptyNote = () => {
    if (isLoading) return;
    if (data.length === 0 && notesPinned.length === 0 && noteOthers.length === 0) {
      return <Empty title="Empty Note" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Note App - PThangDev"></meta>
      </Helmet>
      <div className={cx('wrapper')}>
        {renderEmptyNote()}

        {notesPinned.length > 0 && (
          <NoteContainer
            notes={notesPinned}
            isLoading={isLoading}
            header={{ text: 'Pins', to: routePaths.pins }}
            hideEmptyItem
          />
        )}
        {data.map((topic) => {
          return (
            <NoteContainer
              key={topic._id}
              header={{
                text: topic.name,
                color: topic.background,
                to: `${routePaths.topics}/${topic._id}`,
              }}
              notes={topic.notes}
              loadingItems={4}
              isLoading={isLoading}
              hideEmptyItem
            />
          );
        })}
        {noteOthers.length > 0 && (
          <NoteContainer
            notes={noteOthers}
            isLoading={isLoading}
            header={{ text: 'Others', to: routePaths.others }}
            hideEmptyItem
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
