import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getSession } from '@/api/shared/reducers/authentication';

const useInitializeAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const account = useAppSelector(state => state.authentication.account);
  console.log(account);
  const isAdmin = account?.username === 'admin';

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  return { isAuthenticated, isAdmin, account };
};

export default useInitializeAuth;