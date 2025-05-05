import React from "react";
const CompanyExp = ({
  item,
  index,
}: {
  item: { date: string; name: string; jobTitle: string; jobContent: string[] };
  index: number;
}) => {
  return (
    <li key={index} className={index > 2 ? "print:hidden" : ""}>
      <div className="flex items-center pt-1">
        <div className="h-[10px] w-[10px] rounded-full bg-indigo-500 dark:bg-indigo-500 mr-3  ml-[-25px] "></div>
        <p className="text-sm text-neutral-500 dark:text-neutral-700">
          {item.date}@#{index}
        </p>
      </div>
      <div className="mb-6 ml-4 ">
        <div className="flex flex-2 justify-between">
          <span className="mb-1.5 text-lg font-semibold ">{item.name}</span>
          <span className="mb-1.5 text-gray-600 items-end">
            {item.jobTitle}
          </span>
        </div>
        <div>
          <h5 className="mb-1.5 text-base font-semibold">工作内容</h5>
          <ul className="list-disc text-blue-500  pl-4 font-serif">
            {item.jobContent.map((content, i) => (
              <li key={i} className="pl-5">
                {content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default CompanyExp;
