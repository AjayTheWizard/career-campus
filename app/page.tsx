"use client";

import { useState } from "react";

// @ts-ignore
import { useLocalStorage as uls, useToggle, useClickAway } from "@uidotdev/usehooks";

import { chatBotHandler } from "./actions/chatbot";

type UseLocalStorage = <T>(key: string, initialValue?: T | undefined) => [T, React.Dispatch<React.SetStateAction<T>>]
const useLocalStorage = uls as UseLocalStorage


interface Chat {
  question: string;
  answer: string;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [chats, setChats] = useLocalStorage<Chat[]>("chats", []);

  const [isLoading, toggleLoading] = useToggle(false);
  const [isModalOpen, toggleModal] = useToggle(false);

  const modalRef = useClickAway(function () {
    toggleModal();
  }) as React.LegacyRef<HTMLDivElement>;

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setAnswer("");
      toggleLoading();
      let answer = await chatBotHandler(question);
      setAnswer(answer);

      setChats((prevChats) => [...prevChats, { question, answer }]);
    } finally {
      toggleLoading();
    }
  };
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center">
      {/* {JSON.stringify(resp, null, 2)} */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-2 w-[90%] max-w-[60ch]"
      >
        <label className="text-lg font-bold text-white" htmlFor="question">
          Your Questions
        </label>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          type="text"
          id="question"
          name="question"
          className="bg-zinc-800 transition-all duration-200 focus:outline-none focus:ring-emerald-500 focus:ring-2 px-4 py-2"
        />
      </form>
      <div className="w-[90%] max-w-[66ch] p-4 mt-1 text-zinc-100 leading-7">
        {isLoading && "loading..."}
        {answer.length ? answer : null}
      </div>
      {isModalOpen && (
        <div
          ref={modalRef}
          className="max-w-[80ch] flex-col gap-5 overflow-y-scroll p-4 w-[90%] h-[80vh] flex absolute bg-zinc-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {chats.map((e, i) => {
            return (
              <div key={i}>
                <h1 className="text-lg mb-2 font-semibold">{e.question}</h1>
                <p className="text-md">{e.answer}</p>
              </div>
            );
          })}
        </div>
      )}
      <button
        onClick={() => toggleModal()}
        className="absolute bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 p-2 text-white rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </button>
    </div>
  );
}
