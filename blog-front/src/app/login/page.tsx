"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/store';
import { login } from '@/api/shared/reducers/authentication';
import { usePathname, useRouter } from "next/navigation";

type LoginFormInputs = {
    username: string;
    password: string;
    rememberMe: boolean;
};

const LoginPage = () => {

    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm < LoginFormInputs > ();
    const authenticationState = useSelector((state: RootState) => state.authentication);
    const router = useRouter();

    if (authenticationState.isAuthenticated) {
        return router.push("/");
    }

    const onSubmit: SubmitHandler<LoginFormInputs> = data => {
        dispatch(login(data.username, data.password, data.rememberMe));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(/login-bg1.jpg)` }}>

            <div className="custom-3d-effect p-10 rounded-lg w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center text-white">登   录</h2>
                {authenticationState.loginError && (
                    <p className="text-center mb-4">
                        <strong>Failed to sign in!</strong> Please check your credentials and try again.
                    </p>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block  text-white">用户名</label>
                        <input
                            {...register('username', { required: '用户名不能空!' })}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${errors.username ? 'border-red-500' : ''
                                }`}
                            placeholder="请输入用户名"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block  text-white">密码</label>
                        <input
                            type="password"
                            {...register('password', { required: '密码不能为空!' })}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${errors.password ? 'border-red-500' : ''
                                }`}
                            placeholder="请输入密码"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="mb-4 flex items-center justify-between gap-2">
                        <div className='flex flex-1 items-center justify-betwee'>
                            <input
                                type="checkbox"
                                {...register('rememberMe')}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-white">记住我</label>
                        </div>
                        <a href="/account/reset/request" className="text-white hover:underline">忘记密码?</a>
                    </div>

                    <div className="flex items-center ">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
                        >
                            登录
                        </button>

                    </div>
                </form>
                <p className="mt-6 text-center text-white">
                    没有账号 <a href="/account/register" className="text-white hover:underline">注册</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;