import {
  faCircleXmark,
  faDeleteLeft,
  faMagnifyingGlass,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import qs from 'query-string';
import { ChangeEvent, FC, memo, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import CardTopic from 'src/components/CardTopic';
import Modal from 'src/components/Modal';
import useDebounce from 'src/hooks/useDebounce';
import useGetTopics from 'src/hooks/useGetTopics';
import { Button } from 'src/themes/UI';
import { InputOutline } from 'src/themes/UI/Form';
import { BaseTopic } from 'src/types';
import FormTopic from '../FormTopic';
import styles from './TopicSelect.module.scss';

interface Props {
  topics: BaseTopic[];
  onChangeTopicSelect: (topic: BaseTopic) => void;
}

const cx = classnames.bind(styles);

const TopicSelect: FC<Props> = ({ topics, onChangeTopicSelect }) => {
  const [isOpenFormTopic, setIsOpenFormTopic] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const location = useLocation();

  const searchDebouncedValue = useDebounce(search, 500);

  const { data, isLoading } = useGetTopics({ params: { q: searchDebouncedValue } });

  const { topic: topicId } = qs.parse(location.search);
  const topicSelected = useMemo(() => data.find((tp) => tp._id === topicId), [data, topicId]);

  useEffect(() => {
    if (typeof topicId === 'string') {
      if (!topicSelected) return;
      if (topics.length > 0) return;

      onChangeTopicSelect({
        _id: topicSelected._id,
        name: topicSelected.name,
        background: topicSelected.background,
      });
    }
  }, [data, onChangeTopicSelect, topicId, topicSelected, topics.length]);

  const handleChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };
  const handleChangeTopicSelect = (topic: BaseTopic) => {
    if (topicSelected?._id === topic._id) return;
    onChangeTopicSelect(topic);
  };

  const handleOpenFormTopic = () => {
    setIsOpenFormTopic(true);
  };
  const handleCloseFormTopic = () => {
    setIsOpenFormTopic(false);
  };

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <h3 className={cx('heading')}>Topics:</h3>
          <div className={cx('chip-list')}>
            {topics.map((topic) => (
              <div
                className={cx('chip-item')}
                style={{ backgroundColor: topic.background }}
                key={`chip-item-${topic._id}`}
              >
                {topic.name}
                {!(topicSelected?._id === topic._id) && (
                  <FontAwesomeIcon
                    className={cx('icon')}
                    icon={faCircleXmark}
                    onClick={() => handleChangeTopicSelect(topic)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={cx('options')}>
          <InputOutline
            className={cx('search')}
            margin="none"
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            name="search-topic"
            placeholder="Topic name..."
            onChange={handleChangeInputSearch}
          />
          <Button icon={<FontAwesomeIcon icon={faSquarePlus} />} onClick={handleOpenFormTopic}>
            Add Topic
          </Button>
          {/* <Button status="error" icon={<FontAwesomeIcon icon={faDeleteLeft} />}>
            Clear
          </Button> */}
        </div>
        <div className={cx('list')}>
          {data.map((topic) => (
            <div className={cx('card')} key={topic._id}>
              <CardTopic
                topic={topic}
                fullContent={false}
                onSelect={handleChangeTopicSelect}
                disabled={topicSelected?._id === topic._id}
                checked={Boolean(topics.find((tp) => tp._id === topic._id))}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      <Modal isOpen={isOpenFormTopic} onClose={handleCloseFormTopic}>
        <FormTopic onClose={handleCloseFormTopic} />
      </Modal>
    </>
  );
};

export default memo(TopicSelect);
