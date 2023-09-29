const Scores = require("../model/Scores");

const scores = {
    Leaderboard: async (req, res) => {
        try {
            const { event_id } = req.params;
            
            if (!event_id) throw new Error("Event ID is required")

            const leaderboard = await Scores.Leaderboard(event_id);

            res.status(200).send(leaderboard);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    Delete: async (req, res) => {
        try {
            const { uuid, event_id } = req.body;

            if (!event_id) throw new Error("Event ID cannot be empty");

            if (!uuid) throw new Error("UUID cannot be empty");

            const success = await Scores.Delete(req.body);

            if (!success) throw new Error("Failed to delete score");

            res.status(200).send({ success: success });
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    Update: async (req, res) => {
        try {
            const { score, pts_attained, uuid, event_id } = req.body;
            if (!event_id) throw new Error("Event ID cannot be empty");

            if (!uuid) throw new Error("UUID cannot be empty");

            if (score < 0 || pts_attained < 0)
                throw new Error("Score or points cannot be below 0");

            const newScore = await Scores.Update(req.body);

            res.status(200).send(newScore);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    Create: async (req, res) => {
        try {
            const { score, pts_attained, uuid, event_id } = req.body;

            if (!event_id) throw new Error("Please select an event");

            if (!uuid) throw new Error("Please select a competitor");

            if (score < 0 || pts_attained < 0)
                throw new Error("Score or points cannot be below 0");

            const status = await Scores.Create(req.body);

            if (!status) throw new Error("Failed to create score");

            res.status(200).send({
                success: status,
            });
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
};

module.exports = scores;
