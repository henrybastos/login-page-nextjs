import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DBNAME);
        const users_collection = await db.collection("users_collection");

        const checkExistingUser = await users_collection.findOne({ username: req.body.username });

        if (!checkExistingUser?._id) {
            let newUser = await users_collection.insertOne(req.body);
            res.json({ data: newUser});
        } else {
            res.json({ data: null, error: "Usuário já existente."});
        }
    } catch (err) {
        res.json({ data: null, error: err});
        console.error(err);
    }
};