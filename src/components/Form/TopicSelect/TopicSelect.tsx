import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC, memo } from 'react';

import useGetTopics from 'src/hooks/useGetTopics';
import { Checkbox, Input } from 'src/themes/UI';
import { BaseTopic } from 'src/types';
import styles from './TopicSelect.module.scss';

interface Props {
  topics: BaseTopic[];
  onChangeTopicSelect: (topic: BaseTopic) => void;
}

const cx = classnames.bind(styles);

const TopicSelect: FC<Props> = ({ topics, onChangeTopicSelect }) => {
  const { data, isLoading } = useGetTopics();

  const handleChangeTopicSelect = (topic: BaseTopic) => {
    onChangeTopicSelect(topic);
  };

  console.log({ topics });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <p className={cx('heading')}>Topics:</p>
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
      <Input
        className={cx('search')}
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        name="search-topic"
        placeholder="Topic name..."
      />
      <div className={cx('card')}>
        {data.map((topic) => (
          <Checkbox
            className={cx('topic')}
            style={{ backgroundColor: topic.background }}
            key={topic._id}
            label={topic.name}
            id={topic._id}
            checked={Boolean(topics.find((tp) => tp._id === topic._id))}
            onChange={() =>
              handleChangeTopicSelect({
                _id: topic._id,
                name: topic.name,
                background: topic.background,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default memo(TopicSelect);
