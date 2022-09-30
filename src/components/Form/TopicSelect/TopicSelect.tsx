import {
  faCircleXmark,
  faDeleteLeft,
  faMagnifyingGlass,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { ChangeEvent, FC, memo, useState } from 'react';

import CardTopic from 'src/components/CardTopic';
import Modal from 'src/components/Modal';
import useDebounce from 'src/hooks/useDebounce';
import useGetTopics from 'src/hooks/useGetTopics';
import { Button, Input } from 'src/themes/UI';
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

  const searchDebouncedValue = useDebounce(search, 500);

  const { data, isLoading } = useGetTopics({ params: { q: searchDebouncedValue } });

  const handleChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };
  const handleChangeTopicSelect = (topic: BaseTopic) => {
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
                <FontAwesomeIcon
                  className={cx('icon')}
                  icon={faCircleXmark}
                  onClick={() => handleChangeTopicSelect(topic)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={cx('options')}>
          <Input
            className={cx('search')}
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            name="search-topic"
            placeholder="Topic name..."
            onChange={handleChangeInputSearch}
          />
          <Button icon={<FontAwesomeIcon icon={faSquarePlus} />} onClick={handleOpenFormTopic}>
            Add Topic
          </Button>
          <Button status="error" icon={<FontAwesomeIcon icon={faDeleteLeft} />}>
            Clear
          </Button>
        </div>
        <div className={cx('list')}>
          {data.map((topic) => (
            <div className={cx('card')} key={topic._id}>
              <CardTopic
                topic={topic}
                fullContent={false}
                onSelect={handleChangeTopicSelect}
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
