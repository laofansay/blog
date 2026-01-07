"use client";
import React, { useState } from "react";
import Image from "next/image";
import data from "./art.json";

interface Artwork {
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

const { arts } = data;

export default function Page() {



  const [filter, setFilter] = useState < string > ("all");

  const filteredArts = filter === "all"
    ? arts
    : arts.filter(art => art.type === filter);

  const uniqueTypes = Array.from(new Set(arts.map(art => art.type)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">作品集</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            展示我的设计作品和项目案例
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full ${filter === "all" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}
            >
              全部
            </button>
            {uniqueTypes.map((type, index) => (
              type && (
                <button
                  key={index}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-full ${filter === type ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}
                >
                  {type}
                </button>
              )
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArts.map((art, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <a href={`/art/${art.id || index}`} className="block hover:scale-[1.02] transition-transform duration-300">
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    {typeof art.img === "string" ? (
                      <div className="relative group">
                        <Image
                          src={art.img}
                          alt={art.name}
                          width={300}
                          height={200}
                          className="rounded-lg object-cover w-full h-48"
                          unoptimized={true}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="text-white text-lg font-bold bg-indigo-600 bg-opacity-80 px-3 py-1 rounded">点击详情</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative group">
                        <Image
                          src={art.img[0]}
                          alt={art.name}
                          width={300}
                          height={200}
                          className="rounded-lg object-cover w-full h-48"
                          unoptimized={true}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="text-white text-lg font-bold bg-indigo-600 bg-opacity-80 px-3 py-1 rounded">点击详情</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{art.name}</h3>
                  <p className="text-gray-600">{art.context}</p>
                  {art.type && (
                    <div className="mt-3">
                      <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                        {art.type}
                      </span>
                    </div>
                  )}
                </div>
              </a>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}
