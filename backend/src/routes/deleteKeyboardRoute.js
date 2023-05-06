import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";
import jwt from "jsonwebtoken";

export const deleteKeyboardRoute = {
  path: "/api/keyboard/:id",
  method: "delete",
  handler: async (req, res) => {
    const { authorization } = req.headers;

    //verify header was sent
    if (!authorization || authorization === "Bearer null") {
      console.log("header missing");
      return res.status(401).json({ message: "No authorization header sent." });
    }

    //verify token hasn't been altered
    //header token format is "Bearer sdfasf;asdfsdf;asdsadf"
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Token Verification Failed." });
      } else {
        const id = req.params.id;

        console.log(id);

        const query = { _id: new ObjectId(id) };

        const db = getDbConnection("keyboards");
        const existingKeyboard = await db
          .collection("keyboards")
          .findOne(query);

        if (existingKeyboard) {
          const result = await db.collection("keyboards").deleteOne(query);
          res.status(200).send("keyboard deleted");
        } else {
          res.status(404).send("keyboard not found");
        }
      }
    });
  },
};
