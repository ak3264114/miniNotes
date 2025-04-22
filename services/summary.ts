export async function summarizeNotes(messageContent: string) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://mini-notes-one.vercel.app/auth/login",
            "X-Title": "MiniNotes",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "deepseek/deepseek-r1-zero:free",
            "messages": [
                {
                    "role": "user",
                    "content": `Summarize the following notes:\n\n${messageContent}`
                }
            ]
        })
    });

    const data = await response.json();
    return data;
}

