"use client";
import React from "react";
import {
  Avatar,
  Card,
  CardBody,
  Image,
  Badge,
  ScrollShadow,
  CardFooter,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import { MdOutlineRoom } from "react-icons/md";
import { FaBold } from "react-icons/fa";
import ProjectExp from "@/components/ProjectExp";
import CompanyExp from "@/components/CompanyExp";
import data from "./data.json";
import Plan from "@/components/Plan";
import { FiPhone } from "react-icons/fi";
import { GoDeviceCameraVideo } from "react-icons/go";
import { FaTiktok } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import "./print.css";
const Author = () => {
  const handlePrint = () => {
    window.print();
  };

  const { tags, exps, projectExp, companyList, theme, plans } = data;

  return (
    <>
      <div className="flex justify-center items-center   mx-16 ">
        <div className="rounded-l flex justify-center mx-2 ">
          {/* rigth */}
          <div className="rounded-md my-2 mb-8 w-full md:w-3/4  p-6">
            {/* one */}
            <div className="flex flex-col">
              <div className=" flex justify-between items-center mb-4">
                <h2 className="text-4xl font-bold mb-2">范·文刚</h2>
                <button
                  onClick={handlePrint}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  打印
                </button>
              </div>
              <div className="mt-4 border-y  p-2 space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="mt-1 pr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">电话: </span>
                  </div>
                  <span className="">18591779527</span>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="pr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>
                    </span>{" "}
                    <span className="text-gray-600 text-sm">邮箱:</span>
                  </div>
                  <span className="">jeneryfan@hotmail.com</span>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="pr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">出生年月:</span>
                  </div>
                  <span className="">82,10</span>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center justify-center gap-1">
                    <MdOutlineRoom />
                    <span className="text-gray-600 text-sm"> 居住地:</span>
                  </div>
                  <span className="">西安</span>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <FaGithub />
                    <span className="text-gray-600">github:</span>
                  </div>
                  <span className="text-sm text-blue-400 hover:underline visited:text-purple-600">
                    <a href="https://github.com/hackpros">
                      https://github.com/hackpros
                    </a>
                  </span>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <FaBold />
                    <span className="text-gray-600 text-sm">blog:</span>
                  </div>
                  <span className="text-sm text-blue-400 hover:underline visited:text-purple-600">
                    <a href="https://www.laofansay.us.kg/">
                      https://www.laofansay.us.kg/
                    </a>
                  </span>
                </div>

                <div className="flex justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <FaTiktok size={16} />
                    <span className="text-gray-600 text-sm">抖音号：</span>
                  </div>
                  <div className="text-sm text-blue-400 hover:underline visited:text-purple-600">
                    laofansay_ai
                  </div>
                </div>

                <div className="flex justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <FaBookmark size={16} />
                    <span className="text-gray-600 text-sm">小红书:</span>
                  </div>
                  <a
                    className="text-sm text-blue-400 hover:underline visited:text-purple-600"
                    href="https://www.xiaohongshu.com/user/profile/5e93d9e5000000000100ac37"
                  >
                    小红书
                  </a>
                </div>
              </div>

              <span className="text-gray-600 text-lg  py-2">软件工程师</span>
              <div className="flex  flex-2 justify-between ">
                <div
                  className="flex flex-col pt-2 pb-2 md:w-1/2 border-y border-gray-300
                                          justify-between "
                >
                  <div className="flex flex-2 ">
                    <MdOutlineRoom />
                    <span className="text-gray-800 text-sm ">地点</span>
                  </div>
                  <span className="text-gray-950 text-base font-bold pt-1">
                    陕西·西安
                  </span>
                </div>
                <div className="flex flex-col pt-2 pb-2 md:w-1/2 border-y border-gray-300">
                  <span className="text-gray-800 border-x border-gray-300 pl-10 text-sm">
                    在职状态
                  </span>
                  <span className=" text-base font-bold border-x pl-10 border-gray-300">
                    <span className="rounded-full bg-gray-200 text-base  mr-5 mb-6 px-5   border-blue-900 border border-double">
                      否
                    </span>
                  </span>
                </div>
              </div>
              {theme.map((item, index) => (
                <p key={index} className="font-serif leading-relaxed py-1">
                  {item}
                </p>
              ))}

              <div className="flex flex-wrap m-3 font-serif">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 text-blue-800 text-sm px-4 py-1.5 font-medium hover:bg-blue-200 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* two */}
            <div className="pt-1 pb-3 border-y border-gray-200">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col md:w-1/2 p-1">
                  <span className="text-gray-950 text-xl font-bold pt-2 pb-2">
                    求职意向
                  </span>
                  <div className="flex flex-col space-y-2">
                    <div>
                      <p className="font-bold">系统架构师/技术总监</p>
                      <p>
                        专注微服务架构设计，为电商系统提供一站式技术解决方案
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">全栈高级开发工程师/兼职</p>
                      <p>提供模块化定制服务、项目外包与外派技术支持</p>
                    </div>
                    <div>
                      <p className="font-bold">技术合伙人/技术顾问</p>
                      <p>提供技术咨询、商务合作及创新的技术解决方案</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:w-1/2 p-2">
                  <span className="text-gray-950 text-xl font-bold pb-3">
                    技术经验
                  </span>
                  <div className="flex flex-wrap">
                    {exps.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full text-blue-600 text-sm mr-2 mb-2 px-2.5 py-0.5 border-blue-900 border border-double"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 my-8 transform hover:scale-[1.01] transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                工作经历
              </h2>
              <ol className="space-y-6">
                {companyList.map((company, index) => (
                  <CompanyExp key={index} item={company} index={index} />
                ))}
              </ol>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 my-8 transform hover:scale-[1.01] transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
                项目经验
              </h2>
              <ol className="space-y-6">
                {projectExp.map((item, index) => (
                  <ProjectExp key={index} item={item} index={index} />
                ))}
              </ol>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 my-8 transform hover:scale-[1.01] transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                教育经历
              </h2>
              <div className="space-y-1">
                <div className="flex items-center border-b border-gray-300">
                  <div className="w-1/3 py-4 px-4">
                    <div className="text-sm text-gray-600">本科</div>
                    <div className="text-lg font-semibold text-gray-900 mt-1">
                      西安交通大学
                    </div>
                  </div>
                  <div className="w-1/3 py-4 px-4 border-x border-gray-300">
                    <div className="text-sm text-gray-600">专业</div>
                    <div className="text-base font-semibold text-gray-900 mt-1">
                      计算机科学与技术
                    </div>
                  </div>
                  <div className="w-1/3 py-4 px-4">
                    <div className="text-sm text-gray-600">时间</div>
                    <div className="text-base font-semibold text-gray-900 mt-1">
                      2021-2023
                    </div>
                  </div>
                </div>
                <div className="flex items-center border-b border-gray-300">
                  <div className="w-1/3 py-4 px-4">
                    <div className="text-sm text-gray-600">专科</div>
                    <div className="text-lg font-semibold text-gray-900 mt-1">
                      石油大学
                    </div>
                  </div>
                  <div className="w-1/3 py-4 px-4 border-x border-gray-300">
                    <div className="text-sm text-gray-600">专业</div>
                    <div className="text-base font-semibold text-gray-900 mt-1">
                      计算机网络
                    </div>
                  </div>
                  <div className="w-1/3 py-4 px-4">
                    <div className="text-sm text-gray-600">时间</div>
                    <div className="text-base font-semibold text-gray-900 mt-1">
                      2001-2004
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-1 my-8 transform hover:scale-[1.01] transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                技能
              </h2>

              <div className=" p-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <p className="font-bold text-lg text-gray-900 mb-2">语言</p>
                <p className="text-gray-700">
                  Java、 SQL、 存储过程、Visual
                  Basic、JavaScript、Python、Dos、Shell
                </p>
              </div>
              <div className="mb-1 p-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <p className="font-bold text-lg text-gray-900 mb-2">后端构架</p>
                <p className="text-gray-700">
                  Ionic、Spring、Jhipster、Spring Cloud、Docker、Docker
                  Commons、Docker swarm{" "}
                </p>
              </div>

              <div className="mb-1 p-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <p className="font-bold text-lg text-gray-900 mb-2">中间件</p>
                <p className="text-gray-700">
                  Redis、Rabbitmq、Kafak、Zookeep
                  、OKTA、Keycloak、Mycat、Sharding jdbc、Jsoup
                  、Selenium、Activity7、DynamicReport、Nginx
                </p>
              </div>
              <div className="mb-1 p-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <p className="font-bold text-lg text-gray-900 mb-2">前端技术</p>
                <p className="text-gray-700">
                  Node.js、Nextjs、React、jQuery、tailwindcss,nextUI,Next,vue{" "}
                </p>
              </div>
              <div className="mb-1 p-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <p className="font-bold text-lg text-gray-900 mb-2">
                  数据库技术
                </p>
                <p className="text-gray-700">
                  oracle、mysql、mongode、sql server
                </p>
              </div>
              <div className="mb-1 p-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <p className="font-bold text-lg text-gray-900 mb-2">App技术</p>
                <p className="text-gray-700">
                  ionic7/8,react native ,electron,微信小程序
                </p>
              </div>
              <div className="mb-1 p-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <p className="font-bold text-lg text-gray-900 mb-2">平台/云</p>
                <p className="text-gray-700">
                  linux、aws、heroku、阿里云、oracle cloud、cloudflare
                </p>
              </div>
            </div>

            {/* plan */}
            <div className="bg-white rounded-xl shadow-lg p-1 my-8 transform hover:scale-[1.01] transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                职业规划
              </h2>
              {plans.map((plan, index) => (
                <Plan plan={plan} index={index} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Author;
