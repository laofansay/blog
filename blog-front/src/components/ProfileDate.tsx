"use client";
import React, { useEffect } from "react";
import { getEntities } from "@/api/shared/reducers/tag.reducer";
import { useAppDispatch, useAppSelector } from "@/store/store";

const ProfileDate = () => {
  return (
    <div className="mt-2 px-8 py-2 bg-white  rounded-md shadow-sm">
      <h2 className="small-heading py-2">年月日</h2>
      <div className="grey-rule py-2">
        <hr />
      </div>
      <div className="feature-posts-list w-dyn-list">
        <div role="list" className="w-dyn-items">
          <div className="w-dyn-item py-2 underline  text-gray-400 hover:text-gray-800 transition-colors duration-300">
            <a href="#" className="small-post-link">
              202407
            </a>
          </div>
          <div className="w-dyn-item py-2 underline  text-gray-400 hover:text-gray-800 transition-colors duration-300">
            <a href="#" className="small-post-link">
              202406
            </a>
          </div>
          <div className="w-dyn-item py-2 underline  text-gray-400 hover:text-gray-800 transition-colors duration-300">
            <a href="#" className="small-post-link">
              202405
            </a>
          </div>
        </div>
      </div>
      <div className="grey-rule py-2">
        <hr />
      </div>
    </div>
  );
};

export default ProfileDate;
