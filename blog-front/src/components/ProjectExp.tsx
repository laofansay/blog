import React from "react";

const ProjectExp = ({
  item,
  index,
}: {
  item: {
    date: string;
    item: {
      name: string;
      introduce: string;
      contents: string[];
      useSkill: string;
    }[];
  };
  index: number;
}) => {
  return (
    <li key={index} className={index > 2 ? "print:hidden" : ""}>
      <div className="flex items-center">
        <div className="h-[10px] w-[10px] rounded-full bg-indigo-500 dark:bg-indigo-500 mr-3  ml-[-25px] "></div>
        <p className="text-sm text-neutral-500 dark:text-neutral-700">
          {item.date} @#{index}
        </p>
      </div>
      {item.item.map((item, ii) => (
        <div className="ml-4 mt-1" key={ii}>
          <h5 className="mb-1.5 text-xl font-semibold">{item.name}</h5>
          <div>
            <span className=" text-blue-700">项目描述：</span>
            <p className="font-serif leading-relaxed">{item.introduce}</p>
          </div>
          <div>
            <span className="text-blue-700 font-serif leading-relaxed">
              项目开发内容:{" "}
            </span>
            {item.contents.map((content, i) => (
              <ul key={i} className="list-disc pl-4 font-serif leading-relaxed">
                <li className="pl-5">{content}</li>
              </ul>
            ))}
          </div>
          <p className="mt-1 text-sm mb-2 text-neutral-600 dark:text-neutral-600">
            项目技术: {item.useSkill}
          </p>
        </div>
      ))}
    </li>
  );
};

export default ProjectExp;
