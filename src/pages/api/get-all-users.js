import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DBNAME);
        const users_collection = await db.collection("users_collection");

        const allUsers = await users_collection.find({});
        res.json({ status: 200, data: allUsers });
    } catch (err) {
        console.error(err);
    }
    // client.close();
};