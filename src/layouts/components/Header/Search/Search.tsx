import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import qs from 'query-string';
import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Input } from 'src/themes/UI';
import styles from './Search.module.scss';

interface Props {}

const cx = classNames.bind(styles);

const Search: FC<Props> = (props) => {
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();

  const handleChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchNotes = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    const searchStringify = qs.stringify({ q: search });
    navigate(`/search?${searchStringify}`);
  };

  return (
    <form className={cx('wrapper')} onSubmit={handleSearchNotes}>
      <Input
        className={cx('input')}
        type="text"
        id="search"
        name="search"
        placeholder="Search your title or content..."
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        value={search}
        onChange={handleChangeInputSearch}
        // disabled={isLoading}
      />
    </form>
  );
};
export default Search;
