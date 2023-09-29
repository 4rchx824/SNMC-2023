const Events = require("../model/Events");

const events = {
    findAll: async (req, res) => {
        try {
            const events = await Events.findAll();

            res.status(200).send(events);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    findCompetitors: async (req, res) => {
        try {
            const { event_id } = req.params;

            if (!event_id === null) throw new Error("Event does not exist");

            const events = await Events.findCompetitors(event_id);

            res.status(200).send(events);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    findOne: async (req, res) => {
        try {
            const { event_id } = req.params;

            if (event_id === "All")
                return res.status(200).send({
                    event_id: 0,
                    title: null,
                    status: null,
                    last_updated: null,
                    current: 0,
                });

            const event = await Events.findOne(event_id);

            if (event === null) throw new Error("Event does not exist");

            res.status(200).send(event);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    Selections: async (req, res) => {
        try {
            const selections = await Events.Selections();

            res.status(200).send(selections);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    Delete: async (req, res) => {
        try {
            const { event_id } = req.params;

            const success = await Events.Delete(event_id);

            res.status(200).send({ success: success });
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    UpdateCurrent: async (req, res) => {
        try {
            const { event_id } = req.body;

            if (!event_id === true) throw new Error("Event ID cannot be empty");

            const success = await Events.UpdateCurrent(event_id);

            res.status(200).send({ success: success });
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    Update: async (req, res) => {
        try {
            const { event_id } = req.params;
            const { title, status } = req.body;

            if (title.trim() === "")
                throw new Error("Event name cannot be empty");

            if (
                !["Upcoming", "Ongoing", "Marking", "Completed"].includes(
                    status
                )
            )
                throw new Error("Please select a valid status");

            const success = await Events.Update(event_id, req.body);

            res.status(200).send({ success: success });
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    Create: async (req, res) => {
        try {
            const { eventName } = req.body;
            if (eventName.trim() === "")
                throw new Error("Event name cannot be empty");

            const uuid = await Events.Create(eventName);

            res.status(200).send({ uuid: uuid });
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
    Stats: async (req, res) => {
        try {
            const stats = await Events.Stats();

            res.status(200).send(stats);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    Search: async (req, res) => {
        try {
            const { name, page } = req.query;

            const stats = await Events.Search(name, page, true);
            const data = await Events.Search(name, page, false);

            res.status(200).send({
                results: data,
                stats: stats,
            });
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
};

module.exports = events;
