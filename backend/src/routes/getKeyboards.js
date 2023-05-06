import { getDbConnection } from "../db";

export const getKeyboardsRoute = {
  path: "/api/keyboard",
  method: "get",
  handler: async (req, res) => {
    const db = getDbConnection("keyboards");
    const result = await db.collection("keyboards").find().toArray();

    res.status(200).send(result);
  },
};
