"use server";

let headers = new Headers();
headers.set("Content-Type", "application/json");
headers.set("Authorization", `Bearer ${process.env.OPENAPI_KEY}`);

interface Choice {
  index: number;
  message: { role: string, content: string }
}

export async function chatBotHandler(question: string) {
  const resp = await (
    await fetch("https://api.openai.com/v1/chat/completions", {
      headers,
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
      }),
    })
  ).json() as { choices: Choice[] };
  console.log("question:", question, resp.choices);
  return resp.choices[0].message.content;
}


