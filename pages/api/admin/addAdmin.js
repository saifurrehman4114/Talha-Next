import { dbConnect } from "@/util/connect";
import cors from "cors";
const { definingSchema } = require("../../../schema");
const { passModal } = definingSchema();

export default async function addAmin(req, res) {
  cors()(req, res, async () => {
    await dbConnect();
    const { username, password } = req.body;
    const admin = new passModal({ username, password });
    try {
      await admin.save();
      res.send("added successfully");
    } catch (error) {
      res.status(500).send("unsuccessfull");
    }
  });
}
