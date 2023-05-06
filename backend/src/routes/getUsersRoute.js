import { getDbConnection } from "../db";
import jwt from "jsonwebtoken";

export const getUsersRoute = {
  path: "/api/users",
  method: "get",
  handler: async (req, res) => {
    const { authorization } = req.headers;

    //verify header was sent
    if (!authorization) {
      console.log("header missing");
      return res.status(401).json({ message: "No authorization header sent." });
    }

    //verify token hasn't been altered
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Token Verification Failed." });
      }
    });

    const db = getDbConnection("react-auth-db");
    const result = await db.collection("users").find().toArray();
    //console.log(result)

    res.status(200).send(result);
  },
};
