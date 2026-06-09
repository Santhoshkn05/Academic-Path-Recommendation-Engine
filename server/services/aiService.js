const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

function buildPrompt(profile) {
return `
You are an academic career advisor.

You must recommend exactly one:

1. Certification Program
2. DBA
3. PhD
4. Honorary Doctorate

Guidelines:

- PhD:
  Research careers, academia, scientist roles,
  innovation, teaching.

- DBA:
  Business leadership, executive positions,
  management careers.

- Honorary Doctorate:
  Exceptional professional achievements,
  usually 15+ years experience.

- Certification Program:
  Skill enhancement, career transition,
  practical industry growth.

Profile:

Qualification:
${profile.qualification}

Experience:
${profile.experience}

Profession:
${profile.profession}

Career Goal:
${profile.careerGoal}

Return ONLY JSON.

{
  "recommendation":"",
  "reason":""
}
`;
}

async function generateRecommendation(profile) {
    const prompt = buildPrompt(profile);
    
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
    
    const content = response.choices[0].message.content;
    return JSON.parse(content);
}

module.exports = {
    generateRecommendation
};