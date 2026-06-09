const {
generateRecommendation
} = require(
"../services/aiService"
);

const {
    sendRecommendationEmail
} = require(
    "../services/emailService"
);

const supabase =
require("../database/supabaseClient");

const recommend =
async (req,res)=>{

try{

const profile =
req.body;

const aiResult =
await generateRecommendation(
profile
);

await supabase
.from("submissions")
.insert([
{
fullname:
profile.fullname,

email:
profile.email,

qualification:
profile.qualification,

experience:
profile.experience,

profession:
profile.profession,

career_goal:
profile.careerGoal,

recommendation:
aiResult.recommendation,

reason:
aiResult.reason
}
]);

console.log("PROFILE DATA:");
console.log(profile);

console.log("EMAIL:");
console.log(profile.email);

await sendRecommendationEmail(
    profile.fullname,
    profile.email,
    aiResult.recommendation,
    aiResult.reason
);
console.log("Email:", profile.email);
console.log("Profile:", profile);

res.json(aiResult);

}catch(error){

console.error("FULL ERROR:");
console.error(error);
console.error(error.message);
console.error(error.stack);

res.status(500).json({
message:
"Recommendation failed"
});
}
};

module.exports = {
recommend
};