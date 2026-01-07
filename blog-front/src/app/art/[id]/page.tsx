"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import data from "../art.json";

interface Artwork {
    id?: number;
    name: string;
    context?: string;
    img: string | string[];
    url?: string;
    type?: string;
    content?: string;
}

interface ArtData {
    arts: Artwork[];
}

export default function ArtDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const [selectedImage, setSelectedImage] = useState < string | null > (null);
    const [artData] = useState < ArtData > (data);

    const art = artData.arts.find(item =>
        item.id?.toString() === id || artData.arts.indexOf(item).toString() === id
    );

    if (!art) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">作品未找到</h1>
                    <Link href="/art" className="text-indigo-600 hover:underline">
                        返回作品集
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <Link
                    href="/art"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
                >
                    ← 返回作品集
                </Link>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{art.name}</h1>
                                {art.type && (
                                    <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mt-2">
                                        {art.type}
                                    </span>
                                )}
                            </div>
                        </div>



                        {/* Image Gallery */}
                        {Array.isArray(art.img) && art.img.length > 1 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">作品图集</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {art.img.map((img, imgIndex) => (
                                        <div
                                            key={imgIndex}
                                            className="relative group cursor-pointer"
                                            onClick={() => setSelectedImage(img.startsWith('/') ? img : `/${img}`)}
                                        >
                                            <Image
                                                src={img.startsWith('/') ? img : `/${img}`}
                                                alt={`${art.name} - ${imgIndex + 1}`}
                                                width={300}
                                                height={200}
                                                className="rounded-lg object-cover w-full h-32 cursor-pointer"
                                                unoptimized={true}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <span className="text-white text-sm font-bold bg-indigo-600 bg-opacity-80 px-2 py-1 rounded">点击放大</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-6">
                                {art.context && (
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2">描述</h2>
                                        <p className="text-gray-700 leading-relaxed">{art.context}</p>
                                    </div>
                                )}

                                {art.content && (
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2">内容</h2>
                                        <p className="text-gray-700 leading-relaxed">{art.content}</p>
                                    </div>
                                )}

                                {art.url && (
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2">链接</h2>
                                        <a
                                            href={art.url}
                                            className="text-indigo-600 hover:underline break-words"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {art.url}
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-1">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">作品信息</h2>

                                    {art.type && (
                                        <div className="mb-4">
                                            <h3 className="font-medium text-gray-700">类型</h3>
                                            <p className="text-gray-900">{art.type}</p>
                                        </div>
                                    )}

                                    {art.id !== undefined && (
                                        <div className="mb-4">
                                            <h3 className="font-medium text-gray-700">ID</h3>
                                            <p className="text-gray-900">{art.id}</p>
                                        </div>
                                    )}

                                    {Array.isArray(art.img) && (
                                        <div className="mb-4">
                                            <h3 className="font-medium text-gray-700">图片数量</h3>
                                            <p className="text-gray-900">{art.img.length} 张</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-6xl w-full max-h-[90vh]">
                        <button
                            className="absolute top-4 right-4 text-white text-3xl z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            &times;
                        </button>
                        <Image
                            src={selectedImage}
                            alt="Enlarged view"
                            width={1200}
                            height={800}
                            className="w-full h-full max-h-[80vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                            unoptimized={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}