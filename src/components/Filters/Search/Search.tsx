import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import qs from 'query-string';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useDebounce from 'src/hooks/useDebounce';
import useGetParams from 'src/hooks/useGetParams';
import InputOutline from 'src/themes/UI/Form/InputOutline';
import styles from './Search.module.scss';

interface Props {
  placeholder?: string;
  className?: string;
}

const cx = classnames.bind(styles);

const Search: FC<Props> = ({ placeholder = 'Search...', className, ...inputProps }) => {
  const navigate = useNavigate();

  const { q, sort, limit, page } = useGetParams();

  const [searchKeyword, setSearchKeyword] = useState<string>(q?.toString() || '');

  const searchKeywordDebounced = useDebounce(searchKeyword);

  const handleSearchNotes = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchKeyword(searchValue);
  };

  useEffect(() => {
    const searchParams = qs.stringify(
      { sort, limit, page, q: searchKeywordDebounced || null },
      { skipNull: true }
    );

    navigate({ search: searchParams });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, q, searchKeywordDebounced]);

  return (
    <div className={cx('wrapper', className)}>
      <InputOutline
        {...inputProps}
        icon={<FontAwesomeIcon icon={faSearch} />}
        placeholder={placeholder}
        value={searchKeyword}
        onChange={handleSearchNotes}
        margin="none"
        className={cx('input')}
      />
    </div>
  );
};

export default Search;
