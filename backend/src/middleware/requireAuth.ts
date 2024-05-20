import jwt from "jsonwebtoken";
import env from "../util/validateEnv";
import Admin from "../models/user";

export const requireAuth = async ({ req, res, next }: any) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id }: any = jwt.verify(token, env.JWT_SECRET);

    req.user = await Admin.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};
