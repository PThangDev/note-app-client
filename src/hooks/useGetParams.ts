import { useLocation } from 'react-router-dom';
import qs from 'query-string';

interface Props {}

const useGetParams = () => {
  const location = useLocation();
  const { limit, page, q, sort } = qs.parse(location.search);

  return {
    limit: limit?.toString(),
    page: page?.toString(),
    q: q?.toString(),
    sort: sort?.toString(),
  };
};
export default useGetParams;
