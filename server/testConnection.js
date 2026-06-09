require("dotenv").config();

console.log("URL =", process.env.SUPABASE_URL);
console.log("KEY EXISTS =", !!process.env.SUPABASE_KEY);

const supabase = require("./database/supabaseClient");

async function testConnection() {

    const { data, error } = await supabase
        .from("submissions")
        .select("*");

    if (error) {
        console.error("Connection Error:");
        console.error(error);
        return;
    }

    console.log("Connected Successfully!");
    console.log(data);
    console.log("URL:", process.env.SUPABASE_URL);
}

testConnection();