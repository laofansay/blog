'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, RootState, useAppSelector } from '@/store/store';
import { useSelector } from 'react-redux';
import { logout } from '@/api/shared/reducers/authentication';
import { useRouter } from "next/navigation";

const Logout = () => {

    const logoutUrl = useAppSelector(state => state.authentication.logoutUrl);
    const isLoggedIn = useSelector((state: RootState) => state.authentication.isAuthenticated);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(logout());
        if (logoutUrl) {
            window.location.href = logoutUrl;
        }
    }, [dispatch, logoutUrl]);


    useEffect(() => {
        if (!isLoggedIn) {
            //toast.success("退出成功");
            router.push('/');
        }

    }, [isLoggedIn, dispatch, router]);

    return (
        <></>
    );
};

export default Logout;
