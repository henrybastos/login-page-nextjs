import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DBNAME);
        const users_collection = await db.collection("users_collection");

        const targetUser = await users_collection.findOne({ username: req.body });
        res.json({ status: 200, data: targetUser });
    } catch (err) {
        console.error(err);
    }
};