import { Image } from "@nextui-org/react";
import React from "react";
import { BsTelephonePlus } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

const TeamMember = ({
  name,
  title,
  description,
  email,
  imgSrc,
  isEven,
}: {
  name: string;
  title: string;
  description: string;
  email: string;
  imgSrc: string;
  isEven: boolean;
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        isEven ? "md:flex-row-reverse" : ""
      } items-center text-center md:text-left bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8 overflow-hidden`}
    >
      <div className="w-full md:w-1/2 h-[400px] p-4">
        <Image
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="w-full md:w-1/2 p-8 flex-1">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
          {name}
        </h3>
        <p className="text-gray-600 mb-4 text-lg">{title}</p>
        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center md:items-start">
          <a
            href={`mailto:${email}`}
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center"
          >
            <MdOutlineEmail className="mr-2 text-xl" />
            {email}
          </a>
        </div>
        <div className="flex space-x-4 mt-6">
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <i className="fab fa-xing text-xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
