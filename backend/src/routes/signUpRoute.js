import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    // enable jwt signup
    const { email, password, name } = req.body;

    const db = getDbConnection("react-auth-db");

    const user = await db.collection("users").findOne({ email });

    if (user) {
      //user already exists
      res.sendStatus(409);
    } else {
      const passwordHash = await bcrypt.hash(password, 10);

      const verificationString = uuid();

      const userInfo = {
        name: name,
      };

      const result = await db.collection("users").insertOne({
        email,
        passwordHash,
        info: userInfo,
        isVerified: false,
        verificationString,
      });

      const { insertedId } = result;

      jwt.sign(
        {
          id: insertedId,
          email,
          info: userInfo,
          isVerified: false,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        },
        (err, token) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          res.status(200).json({ token });
        }
      );
    }
  },
};
