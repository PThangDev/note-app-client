import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import qs from 'query-string';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Pagination as IPagination } from 'src/types';
import styles from './Pagination.module.scss';

interface Props {
  pagination?: IPagination;
  pageRangeDisplay?: number;
}

const cx = classNames.bind(styles);

const Pagination: FC<Props> = ({ pagination, pageRangeDisplay = 5 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const paginationParams = qs.parse(location.search);
  const page = Number(paginationParams.page) || 1;
  const pageCount = Number(pagination?.page_count);
  const total = Number(pagination?.total);

  const [pageList, setPageList] = useState<number[]>([]);
  const [pageStart, setPageStart] = useState<number>(0);
  const [pageEnd, setPageEnd] = useState<number>(pageRangeDisplay);
  useEffect(() => {
    if (pageCount <= 1) return;
    const pageList = [];
    for (let pageNumber = 1; pageNumber <= total; pageNumber++) {
      pageList.push(pageNumber);
    }
    setPageList(pageList);
  }, [pageCount, total]);

  useEffect(() => {
    if (pageCount <= 1) return;

    if (pageCount < pageRangeDisplay) {
      setPageStart(0);
      setPageEnd(pageCount);
    } else {
      let pageRange: number;
      let pageRangeStart: number;
      let pageRangeEnd: number;

      if (pageRangeDisplay % 2 !== 0) {
        pageRange = Math.floor(pageRangeDisplay / 2);
        pageRangeStart = pageRange + 1;
        pageRangeEnd = pageRange;
      } else {
        pageRange = Math.floor(pageRangeDisplay / 2);
        pageRangeStart = pageRange;
        pageRangeEnd = pageRange;
      }

      if (page >= pageRangeEnd) {
        if (page + pageRangeEnd < pageCount) {
          setPageStart(page - pageRangeStart);
          setPageEnd(page + pageRangeEnd);
        } else {
          setPageStart(pageCount - pageRangeDisplay);
          setPageEnd(pageCount);
        }
      }
      if (page <= pageRangeEnd) {
        setPageStart(0);
        setPageEnd(pageRangeDisplay);
      }
    }
  }, [page, pageCount, pageRangeDisplay]);
  const handleChangePage = (page: number) => {
    const params = qs.stringify({ ...paginationParams, page });

    navigate(`${location.pathname}?${params}`);
  };
  if (pageCount <= 1 || !pageCount) {
    return null;
  }
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('list')}>
        <button
          className={cx('item', { disabled: page <= 1 })}
          disabled={page <= 1}
          onClick={() => handleChangePage(page > 1 ? page - 1 : 1)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        {pageList.slice(pageStart, pageEnd).map((pageItem, index) => (
          <li
            className={cx('item', { active: page === pageItem })}
            key={pageItem + index}
            onClick={() => handleChangePage(pageItem)}
          >
            {pageItem}
          </li>
        ))}
        <button
          className={cx('item', { disabled: page >= pageCount })}
          disabled={page >= pageCount}
          onClick={() => handleChangePage(page < pageCount ? page + 1 : pageCount)}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </ul>
    </div>
  );
};
export default Pagination;
