function buildPrompt(profile) {

return `
You are an academic advisor.

Based on the profile below,
recommend ONLY ONE option:

1. Certification Program
2. DBA
3. PhD
4. Honorary Doctorate

Profile:

Qualification:
${profile.qualification}

Experience:
${profile.experience}

Profession:
${profile.profession}

Career Goal:
${profile.careerGoal}

Return ONLY valid JSON.

{
  "recommendation": "",
  "reason": ""
}
`;
}

module.exports = {
    buildPrompt
};