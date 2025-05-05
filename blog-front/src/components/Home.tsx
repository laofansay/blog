import TeamMember from "@/components/TeamMember";
import { Image } from "@nextui-org/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephonePlus } from "react-icons/bs";
import { MdOutlinePlace } from "react-icons/md";

import hoemdata from "./data/data.json";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const HomePage = () => {
  const { service } = hoemdata;
  return (
    <div className="bg-gray-100 text-gray-700 min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-6 flex-grow">
        <section className="mb-6 ">
          <div className="max-w-6xl mx-auto p-8  rounded-md">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row  items-center text-center md:text-left p-4">
                <Image
                  src="/fan.jpg"
                  alt="head"
                  className="w-80 h-80 rounded-full object-cover mb-4 md:mb-0 md:mx-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">独立开发-老范工作室</h3>
                  <h5 className="text-4xl font-bold mt-2 ">文刚</h5>
                  <p className="text-gray-500 mb-2 mt-1">软件工程师</p>
                  <p className="text-gray-700 mb-4">
                    我是一名资深的软件开发工程师，拥有丰富的互联网技术开发经验。当前，我专注于独立开发、个人IP塑造以及企业品牌建设，致力于为客户提供创新且高效的技术解决方案。
                  </p>

                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 justify-start items-baseline gap-4">
                    <a
                      href={`mailto:jeneryfan@hotmaio.com`}
                      className="text-blue-500 flex items-center"
                    >
                      <MdOutlinePlace className="mr-1" />
                      <span>西安</span>
                    </a>
                    <a
                      href={`mailto:jeneryfan@hotmail.com`}
                      className="text-blue-500 flex items-center"
                    >
                      <MdOutlineEmail className="mr-1" />
                      <span>jeneryfan@hotmail.com</span>
                    </a>
                    <a
                      href={`tel:18591779527`}
                      className="text-blue-500 flex items-center"
                    >
                      <BsTelephonePlus className="mr-1" />
                      <span>call me</span>
                    </a>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <a href="#" className="text-gray-500">
                      <i className="fab fa-facebook-f">2</i>
                    </a>
                    <a href="#" className="text-gray-500">
                      <i className="fab fa-linkedin-in">3</i>
                    </a>
                    <a href="#" className="text-gray-500">
                      <i className="fab fa-instagram">4</i>
                    </a>
                    <a href="#" className="text-gray-500">
                      <i className="fab fa-xing">5</i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="max-w-6xl mx-auto p-8 rounded-md">
            <h2 className="text-4xl font-bold text-left mb-8">学历</h2>
            <div className="space-10">
              <div
                className={`flex flex-col md:flex-row  items-center text-center md:text-left`}
              >
                <div className="w-full md:w-1/2">
                  <img
                    src="sy.png"
                    alt=""
                    className="object-cover mx-auto md:mx-0"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-4 flex-1 md:pr-4">
                  <h3 className="text-xl font-bold">西安石油大学</h3>
                  <p className="text-gray-500 mb-2">计算机网络</p>
                  <p className="text-gray-700 mb-4">2001.9--2024.7</p>
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2"></div>
                  <div className="flex space-x-2 mt-2">
                    <a href="#" className="text-gray-500">
                      <i className="fab fa-facebook-f">大专</i>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col md:flex-row  items-center text-center md:text-left`}
              >
                <div className="w-full md:w-1/2">
                  <img
                    src="jt.png"
                    alt=""
                    className="object-cover mx-auto md:mx-0 "
                    width={200}
                    height={200}
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-4 flex-1 md:pr-4">
                  <h3 className="text-xl font-bold">西安交能大学</h3>
                  <p className="text-gray-500 mb-2">计算机科学与技术</p>
                  <p className="text-gray-700 mb-4">2021.1-2023.7</p>
                  <div className="flex space-x-2 mt-2">
                    <a href="#" className="text-gray-500">
                      <i className="fab fa-facebook-f">本科</i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-6">
          <div className="max-w-6xl mx-auto p-8  rounded-md">
            <h2 className="text-4xl font-bold text-left mb-8">技术服务</h2>
            <div className="space-10">
              {service.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  title={member.title}
                  description={member.description}
                  email={member.email}
                  imgSrc={member.imgSrc}
                  isEven={index % 2 === 1}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
