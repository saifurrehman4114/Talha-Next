import { dbConnect } from "@/util/connect";

const { definingSchema } = require("../../../schema");
const { passModal } = definingSchema();
export default async function checkAdmin(req, res) {
  await dbConnect();
  const { username, password } = req.body;
  const admins = await passModal.find();
  const single = admins[0];
  if (single.username === username && single.password === password) {
    res.status(200).send(true);
  } else {
    res.status(200).send(false);
  }
}