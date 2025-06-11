'use client';
import React, { useEffect, useState } from 'react';
import { getList, reset } from '@/api/shared/reducers/app/app.tag.reducer';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ITEMS_PER_PAGE } from '@/api/shared/util/pagination.constants';
import Link from 'next/link';

const ProfileTags = () => {
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const rowsPerPage = ITEMS_PER_PAGE;

    // 获取标签数据状态
    const tagState = useAppSelector(state => state.tag);
    const { entities: tags, loading, errorMessage } = tagState;

    useEffect(() => {
        // 发送API请求获取标签数据
        dispatch( getList());
        // 组件卸载时清理状态
        return () => {
            dispatch(reset());
        };
    }, [page, dispatch, rowsPerPage]);

    console.log('标签数据:', tags);

    return (
        <div className="mt-2 px-8 py-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-800 pb-2 border-b border-gray-200">标签</h2>

            {/* 标签云 */}
            <div className="mt-4">
                {!tags || tags.length === 0 ? (
                    <div className="py-4 text-center text-gray-500 italic">
                        暂无标签数据
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <Link
                                key={tag.id || index}
                                href={`/list?tag=${tag.name}`}
                                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                            >
                                {tag.icon && (
                                    <span className="mr-1">{tag.icon}</span>
                                )}
                                <span className="text-sm">{tag.name}</span>
                            </Link>
                        ))}
                    </div>
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
                    <p className="font-medium">获取标签失败</p>
                    <p className="mt-1">{errorMessage}</p>
                </div>
            )}
        </div>
    );
};

export default ProfileTags;