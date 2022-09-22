import { useLocation } from 'react-router-dom';
import qs from 'query-string';

interface Props {}

const useGetParams = () => {
  const location = useLocation();
  const params = qs.parse(location.search);

  return params;
};
export default useGetParams;
