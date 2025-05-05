import { findIndex, keyBy } from "lodash";
import React from "react";
const Plan = ({
  plan,
  index,
}: {
  plan: { title: string; list: string[] };
  index: number;
}) => {
  return (
    <div key={index} className="space-y-3 py-2">
      <p className="font-bold">{plan.title}</p>
      {plan.list.map((item, key) => (
        <li key={key}>{item}</li>
      ))}
    </div>
  );
};

export default Plan;
