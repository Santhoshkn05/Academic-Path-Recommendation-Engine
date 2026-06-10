async function generateRecommendation(profile) {

    console.log("PROFILE RECEIVED:");
    console.log(profile);

    const prompt = buildPrompt(profile);

    console.log("PROMPT:");
    console.log(prompt);

    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 1024,
        response_format: { type: "json_object" }
    });

    const content =
        response.choices[0].message.content;

    console.log("AI RESPONSE:");
    console.log(content);

    return JSON.parse(content);
}

module.exports = {
    generateRecommendation
};