"use client";

import { QuizPage } from "./QuizPage";
import { useState } from "react";

const usePage = (onIncrement: (page: number) => void) => {
  const [num, setNum] = useState(0);
  const increment = () => {
    setNum((e) => e + 1);
    onIncrement(num + 1);
  };
  return [num, increment] as const;
};

export const Quiz = () => {
  const [page, nextPage] = usePage(function (page: number) {
    if (page == 1) {
    }
  });
  const [] = useState({
    isHigher: false
  })
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {page === 0 && (
        <QuizPage
          title="Are you interested in pursuing Higher Education studies or Diploma course?"
          onSelection={(e) => {
            if(e === "yes"){
              nextPage();
            }else{
              
            }
          }}
          choices={[
            {
              title: "Yes",
              value: "yes",
            },
            {
              title: "No",
              value: "no",
            },
          ]}
        />
      )}
      {page === 1 && (
        <QuizPage
          title="What's Your field of interest?"
          onSelection={(e) => {
            nextPage();
          }}
          choices={[
            {
              title: "Yes",
              value: "yes",
            },
            {
              title: "No",
              value: "no",
            },
          ]}
        />
      )}
    </div>
  );
};
