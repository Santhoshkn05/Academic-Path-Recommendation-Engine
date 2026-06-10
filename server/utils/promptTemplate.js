function buildPrompt(profile) {

return `
You are an expert academic advisor.

Analyze the candidate's qualification, experience, profession, and career goals.

Recommendation Guidelines:

1. Certification Program

* Suitable for students, freshers, career changers, and professionals seeking specific skills.
* Recommended when practical industry knowledge is needed.

2. DBA (Doctor of Business Administration)

* Suitable for experienced professionals, managers, entrepreneurs, and business leaders.
* Recommended for business leadership, executive management, and organizational strategy goals.

3. PhD

* Suitable for individuals interested in research, academia, teaching, innovation, or scientific contributions.
* Recommended for research-oriented career goals.

4. Honorary Doctorate

* Suitable only for individuals with exceptional achievements, leadership, social impact, or significant contributions to society.
* Should be recommended rarely.

Candidate Profile:

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
