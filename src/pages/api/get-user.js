import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DBNAME);
        const users_collection = await db.collection("users_collection");

        const targetUser = await users_collection.findOne({ $and: [
            { $or: [{username: req.body.user}, {email: req.body.user}] },
            { password: req.body.password }
        ]});

        if (targetUser) {
            res.json({ status: 200, data: targetUser });
        } else {
            res.json({ status: 404, data: "User not found" });
        }
    } catch (err) {
        console.error(err);
    }
};