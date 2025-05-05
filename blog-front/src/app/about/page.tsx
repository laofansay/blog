"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

import socialData from "@/components/data/about.json";

const About = () => {
  const imageUrl = "/about-bg.avif";

  const { socialInfo } = socialData;
  const { profile } = socialData;
  const { techStack } = socialData;
  const { teamMembers } = socialData;
  const { initiatives } = socialData;

  const [qrCode, setQrCode] = useState<string | null>(null);

  // 团

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            老范工作室
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
            专注技术创新，追求卓越品质，为客户提供最优质的技术解决方案
          </p>
        </div>
      </div>

      {/* 个人介绍卡片 */}
      <div className="max-w-4xl mx-auto -mt-20 relative z-10 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="">
            <div className="w-48 h-48 relative rounded-sm overflow-hidden border-4 border-blue-100">
              {/* 顶部提示文字 */}
              <div className="absolute top-0 left-0 w-full bg-black bg-opacity-60 text-white text-sm text-center py-1">
                打码加微信
              </div>
              <Image
                src="/link/fan-wx.png"
                alt={socialInfo.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="mt-4 space-y-2">
              <button
                onClick={() =>
                  (window.location.href = "mailto:jeneryfan@hotmail.com")
                }
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <FaEnvelope className="text-lg" />
                联系我
              </button>
              <button
                onClick={() => (window.location.href = "tel:18591779527")}
                className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <FaPhone className="text-lg" />
                咨询服务
              </button>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{socialInfo.name}</h2>
            <p className="text-xl text-blue-600 mb-4">{socialInfo.title}</p>
            <p className="text-gray-600 mb-6">
              专注于全栈开发和系统架构设计，致力于创造优质的用户体验和高性能的技术解决方案。
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {socialInfo.media.map((m, index) => (
                <div key={index} className="relative group">
                  {m.link ? (
                    <a
                      href={m.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                    >
                      <span>{m.name}</span>
                      <span className="font-semibold">{m.followers}</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => setQrCode(m.qrCode)}
                      className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                    >
                      <span>{m.name}</span>
                      <span className="font-semibold">{m.followers}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 个人简介 Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            关于我
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={profile.image}
                alt={profile.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">
                {profile.name}
              </h3>
              <p className="text-blue-600 text-xl">{profile.role}</p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {profile.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{profile.contact.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaPhone className="mr-2" />
                  <span>{profile.contact.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="mr-2" />
                  <span>{profile.contact.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 技术栈 Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            技术栈
          </h2>

          {/* 开发工具 */}
          <div className="mb-4 border border-gray-300 rounded-lg p-4">
            <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-left">
              开发工具
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {techStack.development.map((tech, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl p-6 bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r ${tech.fromColor} ${tech.toColor} shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Image
                        src={tech.iconUrl}
                        alt={tech.name}
                        width={40}
                        height={40}
                        className="object-contain group-hover:animate-pulse"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {tech.name}
                      </h4>
                      <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                        {tech.type}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-purple-500/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-center justify-center backdrop-blur-sm">
                    <p className="text-sm text-white text-center font-medium transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      {tech.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              ))}
            </div>
          </div>

          {/* 生产力工具 */}
          <div className=" border border-gray-300 rounded-lg p-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-left">
              生产力工具
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {techStack.productivity.map((tech, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r ${tech.fromColor} ${tech.toColor} shadow-lg transform transition-all duration-300 group-hover:scale-110`}
                    >
                      <Image
                        src={tech.iconUrl}
                        alt={tech.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {tech.name}
                      </h4>
                      <p className="text-sm text-gray-500">{tech.type}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-90 transition-opacity duration-300 p-4 flex items-center justify-center">
                    <p className="text-sm text-gray-600 text-center">
                      {tech.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 项目经验 Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            项目经验
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile.projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 团队介绍 Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8  bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            我的团队
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 group border border-gray-100 hover:shadow-2xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    className="transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 relative">
                  <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                    {member.description}
                  </p>
                  <div className="flex gap-4 pt-2 border-t border-gray-100">
                    {member.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 公益服务 Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            公益服务
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group border border-gray-100 hover:shadow-2xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={initiative.image}
                    alt={initiative.title}
                    layout="fill"
                    objectFit="cover"
                    className="transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 line-clamp-3">
                    {initiative.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 二维码弹窗 */}
      {qrCode && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onMouseDown={() => setQrCode(null)}
        >
          <div className="bg-white p-4 rounded-lg">
            <img src={qrCode} alt="QR Code" className="w-40 h-40" />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
