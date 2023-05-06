import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";

export const getKeyboardRoute = {
  path: "/api/keyboard/:id",
  method: "get",
  handler: async (req, res) => {
    const id = req.params.id;

    const query = { _id: new ObjectId(id) };
    const db = getDbConnection("keyboards");
    const result = await db.collection("keyboards").findOne(query);

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("keyboard not found");
    }
  },
};
