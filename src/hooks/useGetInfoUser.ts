import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetInfoUser } from 'src/pages/auth/authActions';

interface Props {}

const useGetInfoUser = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchGetInfoUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user;
};
export default useGetInfoUser;
