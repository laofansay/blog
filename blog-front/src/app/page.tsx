import TeamMember from "@/components/TeamMember";
import { Image } from "@nextui-org/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephonePlus } from "react-icons/bs";
import { MdOutlinePlace } from "react-icons/md";
import hoemdata from "@/components/data/data.json";

const HomePage = () => {
  const { service } = hoemdata;

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* 个人简介部分 */}
        <section className="mb-12">
          <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Image
                src="/fan.JPG"
                alt="head"
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    独立开发-老范工作室
                  </h3>
                  <h1 className="text-4xl font-bold text-gray-900">文刚</h1>
                  <p className="text-gray-600">软件工程师</p>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  我是一名资深的软件开发工程师，有着丰富的互联网技术软件开发经验，目前正在从事独立开发、个人IP、企业品牌建设相关的工作。
                </p>
                <div className="flex flex-col md:flex-row gap-4 text-gray-700">
                  <a
                    href={`mailto:jeneryfan@hotmail.com`}
                    className="flex items-center hover:text-blue-600 transition-colors"
                  >
                    <MdOutlineEmail className="mr-2 text-xl" />
                    <span>jeneryfan@hotmail.com</span>
                  </a>
                  <a
                    href={`tel:18591779527`}
                    className="flex items-center hover:text-blue-600 transition-colors"
                  >
                    <BsTelephonePlus className="mr-2 text-xl" />
                    <span>call me</span>
                  </a>
                  <div className="flex items-center">
                    <MdOutlinePlace className="mr-2 text-xl" />
                    <span>西安</span>
                  </div>
                </div>
                <div className="flex gap-4 text-gray-600">
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    <i className="fab fa-facebook-f text-xl"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    <i className="fab fa-linkedin-in text-xl"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    <i className="fab fa-xing text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 技术服务部分 */}
        <section className="mb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              技术服务
            </h2>
            <div className="space-y-8">
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
