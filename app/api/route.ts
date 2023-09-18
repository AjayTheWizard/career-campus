import { useOpenAPI } from "@/hooks/useOpenAPI";
import { NextResponse } from "next/server";

// export const GET = async () =>});

export async function GET() {
  const resp = await useOpenAPI({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You're Counseller who guides student studying in India just completed their Secondary School",
      },
      {
        role: "user",
        content:
          "Ask me any questions about Which are paths available to choose after completing secondary school?",
      },
    ],
  });
  console.log(JSON.stringify(resp.choices, null, 2))
  return NextResponse.json({
    msg: "ok"
  })
}
