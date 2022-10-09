import classnames from 'classnames/bind';
import qs from 'query-string';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGetParams from 'src/hooks/useGetParams';
import styles from './Sort.module.scss';

interface Option {
  value: string;
  title: string;
}

interface Props {
  options: Option[];
  className?: string;
}

const cx = classnames.bind(styles);

const Sort: FC<Props> = ({ options, className }) => {
  const navigate = useNavigate();

  const { sort, ...searchLocation } = useGetParams();

  const [sortField, setSortField] = useState<string>(sort || '');

  useEffect(() => {
    const searchParams = qs.stringify(
      { ...searchLocation, sort: sortField || null },
      { skipNull: true }
    );

    navigate({
      search: searchParams,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, sort, sortField]);

  const handleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    setSortField(sortValue);
  };

  return (
    <select className={cx('wrapper', className)} value={sortField} onChange={handleChangeSort}>
      <option value="">--- Sort ---</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default Sort;
