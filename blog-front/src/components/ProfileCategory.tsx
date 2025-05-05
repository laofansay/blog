'use client';
import React, { useEffect, useState } from 'react';
import { getEntities, reset } from '@/api/shared/reducers/category.reducer';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ITEMS_PER_PAGE } from '@/api/shared/util/pagination.constants';
import Link from 'next/link';

const ProfileCategory = () => {
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const rowsPerPage = ITEMS_PER_PAGE;

    // 获取分类数据状态
    const categoryState = useAppSelector(state => state.category);
    const { entities: resuelt, loading, errorMessage } = categoryState;

    // Redux调度
    useEffect(() => {
        console.log('通过Redux调度API请求...');
        dispatch(
            getEntities({
                page: page - 1,
                size: rowsPerPage,
                sort: "id,desc",
                query: '' // 添加空查询参数
            })
        );

        // 组件卸载时清理状态
        return () => {
            dispatch(reset());
        };
    }, [page, dispatch, rowsPerPage]);

    // 打印resuelt的值和整个状态
    console.log('Category数据:', resuelt);
    console.log('Category状态:', categoryState);

    return (
        <div className="mt-2 px-8 py-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-800 pb-2 border-b border-gray-200">分类</h2>

            {/* 分类列表 */}
            <div className="mt-4">
                {!resuelt || resuelt.length === 0 ? (
                    <div className="py-4 text-center text-gray-500 italic">
                        暂无分类数据
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {resuelt.map((item, index) => (
                            <li
                                key={item.id || index}
                                className="group relative pl-4 py-1.5 border-l-2 border-transparent hover:border-blue-500 transition-all duration-200 ease-in-out"
                            >
                                <Link
                                    href={`/list?category=${item.name}`}
                                    className="block text-gray-600 group-hover:text-blue-600 font-medium text-sm transition-colors duration-200"
                                >
                                    {item.name}
                                    <span className="absolute inset-0"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 加载指示器 */}
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-pulse flex space-x-4">
                        <div className="h-2 bg-gray-200 rounded w-12"></div>
                        <div className="h-2 bg-gray-200 rounded w-12"></div>
                        <div className="h-2 bg-gray-200 rounded w-12"></div>
                    </div>
                </div>
            )}

            {/* 错误提示 */}
            {errorMessage && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                    <p className="font-medium">获取分类失败</p>
                    <p className="mt-1">{errorMessage}</p>
                </div>
            )}
        </div>
    );
};

export default ProfileCategory;