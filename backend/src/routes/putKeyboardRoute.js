import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";
import jwt from "jsonwebtoken";

export const putKeyboardRoute = {
  path: "/api/keyboard/:id",
  method: "put",
  handler: async (req, res) => {
    // enable authentication and update the keyboard
    const { authorization } = req.headers;

    //verify header was sent
    if (!authorization || authorization === "Bearer null") {
      console.log("header missing");
      return res.status(401).json({ message: "No authorization header sent." });
    }

    //verify token hasn't been altered
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Token Verification Failed." });
      } else {
        const { id } = req.params;

        const query = { _id: new ObjectId(id) };
        const db = getDbConnection("keyboards");

        const existingKeyboard = await db
          .collection("keyboards")
          .findOne(query);

        if (existingKeyboard) {
          const keyboardData = req.body;
          //exclude the _id field from being updated
          delete keyboardData._id;

          const result = await db
            .collection("keyboards")
            .findOneAndUpdate(
              { _id: new ObjectId(id) },
              { $set: keyboardData },
              { returnOriginal: false }
            );

          res.status(200).send(result.value);
        } else {
          res.status(404).send("keyboard not found");
        }
      }
    });
  },
};
