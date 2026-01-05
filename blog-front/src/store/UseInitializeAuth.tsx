import { useEffect } from 'react';


import { useAppDispatch, useAppSelector } from '@/store/store';
import { getSession } from '@/api/shared/reducers/authentication';
import { hasAnyAuthority } from '@/api/config/private-route';
import { AUTHORITIES } from '@/api/config/constants';

const useInitializeAuth = () => {

  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const account = useAppSelector(state => state.authentication.account);



  useEffect(() => {
    dispatch(getSession());
  }, []);



};

export default useInitializeAuth;