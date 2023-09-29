const Leaderboard = require("../model/Leaderboard");
const Events = require("../model/Events");
const Scores = require("../model/Scores");
const leaderboards = {
    OneEvent: async (req, res) => {
        try {
            const { event_id } = req.params;

            const event = await Events.findOne(event_id);

            if (event === null) throw new Error("Event does not exist");

            res.status(200).send(event);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    AllEvents: async (req, res) => {
        try {
            const selections = await Events.Selections();

            res.status(200).send(selections);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    OverallStandings: async (req, res) => {
        try {
            const leaderboard = await Scores.Leaderboard("All");

            res.status(200).send(leaderboard);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    CurrentStandings: async (req, res) => {
        try {
            let { event_id } = req.params;
            event_id = event_id ?? "All";
            let current = await Events.Current();

            event_id = event_id !== "All" ? event_id : current.event_id;

            if (!event_id) throw new Error("Event ID is required");

            const leaderboard = await Scores.Leaderboard(event_id);

            res.status(200).send(leaderboard);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    Current: async (req, res) => {
        try {
            const current = await Events.Current();

            res.status(200).send(current);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
};

module.exports = leaderboards;
