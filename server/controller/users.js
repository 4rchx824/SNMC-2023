const Users = require("../model/Users");

const users = {
    findEligible: async (req, res) => {
        try {
            const { event_id } = req.params;

            const eligible = await Users.findEligible(event_id);

            res.status(200).send(eligible);
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    Create: async (req, res) => {
        try {
            let { name, email, organisation, seat, role, gender, password } =
                req.body;

            if (name.trim() === "") throw new Error("Name cannot be empty");

            if (role === "Competitor" && seat === "")
                throw new Error("Seat Number is required for competitors");

            if (!["Admin", "Competitor"].includes(role))
                throw new Error("Please select a valid role");

            if (!["Male", "Female"].includes(gender))
                throw new Error("Please select a valid gender");

            if (role === "Admin" && email.trim() === "")
                throw new Error("Please enter a valid email address");

            if (
                role === "Admin" &&
                (password.trim() === "" || password.trim().length < 6)
            )
                throw new Error("Password must be at least 6 characters long");

            const uuid = await Users.Create(req.body);

            res.status(200).send({ uuid: uuid });
        } catch (e) {
            let message = e.message;
            if (e.code === "ER_DUP_ENTRY")
                message = "EMAIL OR SEAT ALREADY TAKEN";

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
    Search: async (req, res) => {
        try {
            const { name, page } = req.query;

            const stats = await Users.Search(name, page, true);
            const data = await Users.Search(name, page, false);

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
    Update: async (req, res) => {
        try {
            const { organisation, seat, gender, name } = req.body;
            const { uuid } = req.params;

            if (name.trim() === "") throw new Error("Name cannot be empty");
            if (!["Male", "Female"].includes(gender))
                throw new Error("Please select a valid gender");

            const success = await Users.Update(uuid, req.body);

            if (!success) throw new Error("Failed to update user");

            res.status(200).send({
                success: success,
            });
        } catch (e) {
            let message = e.message;
            if (e.code === "ER_DUP_ENTRY")
                message = "Seat has already been taken";

            console.error(e);
            res.status(500).send({ message: message });
        }
    },

    Delete: async (req, res) => {
        try {
            const { uuid } = req.params;

            const success = await Users.Delete(uuid);

            if (!success) throw new Error("Failed to delete user");

            res.status(200).send({
                success: success,
            });
        } catch (e) {
            let message = e.message;

            console.error(e);
            res.status(500).send({ message: message });
        }
    },
};

module.exports = users;
