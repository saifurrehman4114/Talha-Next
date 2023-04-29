import { dbConnect } from "@/util/connect";

const { definingSchema } = require("../../../schema");
const { brandModal } = definingSchema();

export default async function addBrand(req, res) {
  await dbConnect();
  try {
    const newBrand = new brandModal(req.body);
    await newBrand.save();
    res.status(200).send("brand successfully added");
  } catch (error) {
    res.status(500).send(error, "in adding brand maybe already existing");
  }
}
