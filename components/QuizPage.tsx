"use client";

export interface QuizPageProp {
  onSelection: (choice: string) => void;
  title: string;
  choices: { title: string; value: string }[];
}

export function QuizPage({ onSelection, title, choices }: QuizPageProp) {
  return (
    <div>
      <h1 className="text-2xl mb-3 w-[40vw]">{title}</h1>
      <div className="flex flex-col gap-2">
        {choices.map((e) => {
          return (
            <button
              className="bg-emerald-800 hover:bg-emerald-900 w-fit px-5 rounded-lg py-2"
              onClick={() => {
                onSelection(e.value);
              }}
            >
              {e.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
