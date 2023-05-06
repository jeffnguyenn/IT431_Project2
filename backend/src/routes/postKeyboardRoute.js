import { getDbConnection } from "../db";
import jwt from "jsonwebtoken";

export const postKeyboardRoute = {
  path: "/api/keyboard",
  method: "post",
  handler: async (req, res) => {
    // add authentication and save new keyboard
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
        const db = getDbConnection("keyboards");
        const result = await db.collection("keyboards").insertOne(req.body);
        const insertedKeyboard = await db
          .collection("keyboards")
          .findOne({ _id: result.insertedId });
        //console.log(result)
        res.status(201).json({
          message: "Keyboard created successfully",
          keyboard: insertedKeyboard,
        });
      }
    });
  },
};
