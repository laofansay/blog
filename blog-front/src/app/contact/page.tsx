"use client";

import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWeixin, FaGithub } from 'react-icons/fa';

const Contact = () => {
    const contactInfo = {
        email: 'jeneryfan@hotmail.com',
        phone: '18591779527',
        address: '陕西省西安市',
        wechat: 'fan-wx',
        github: 'https://github.com/jeneryfan'
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* 标题部分 */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">联系我们</h1>
                    <p className="text-lg sm:text-xl text-gray-600">随时欢迎与我们联系，我们将为您提供专业的技术支持和服务</p>
                </div>

                {/* 联系信息卡片 */}
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* 左侧联系方式 */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">联系方式</h2>

                            <a href={`mailto:${contactInfo.email}`} className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                                <FaEnvelope className="text-2xl text-blue-600 mr-4" />
                                <div>
                                    <p className="font-medium text-gray-900">电子邮件</p>
                                    <p className="text-gray-600">{contactInfo.email}</p>
                                </div>
                            </a>

                            <a href={`tel:${contactInfo.phone}`} className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300">
                                <FaPhone className="text-2xl text-green-600 mr-4" />
                                <div>
                                    <p className="font-medium text-gray-900">电话</p>
                                    <p className="text-gray-600">{contactInfo.phone}</p>
                                </div>
                            </a>

                            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                                <FaMapMarkerAlt className="text-2xl text-purple-600 mr-4" />
                                <div>
                                    <p className="font-medium text-gray-900">地址</p>
                                    <p className="text-gray-600">{contactInfo.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* 右侧社交媒体 */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">社交媒体</h2>

                            <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                                <FaWeixin className="text-2xl text-yellow-600 mr-4" />
                                <div>
                                    <p className="font-medium text-gray-900">微信</p>
                                    <p className="text-gray-600">{contactInfo.wechat}</p>
                                </div>
                            </div>

                            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                <FaGithub className="text-2xl text-gray-800 mr-4" />
                                <div>
                                    <p className="font-medium text-gray-900">GitHub</p>
                                    <p className="text-gray-600">查看我们的开源项目</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* 联系表单 */}
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">发送消息</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="请输入您的姓名"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="请输入您的邮箱"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">消息内容</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="请输入您的消息"
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                            >
                                发送消息
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;