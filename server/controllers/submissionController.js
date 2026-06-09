const supabase =
require("../database/supabaseClient");

const getSubmissions =
async (req, res) => {

    try {

        const { data, error } =
        await supabase
        .from("submissions")
        .select("*")
        .order("created_at", {
            ascending: false
        });

        if (error) {
            throw error;
        }

        res.status(200).json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
            "Failed to fetch submissions"
        });
    }
};

const deleteSubmission =
async (req, res) => {

    try {

        const { id } = req.params;

        const { error } =
        await supabase
        .from("submissions")
        .delete()
        .eq("id", id);

        if (error) {
            throw error;
        }

        res.status(200).json({
            message:
            "Submission deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
            "Failed to delete submission"
        });
    }
};

module.exports = {
    getSubmissions,
    deleteSubmission
};