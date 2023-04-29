import { dbConnect } from "@/util/connect";

let { definingSchema } = require("../../../schema");
const { productModal } = definingSchema();
export default async function getAllAdmin(req, res) {
  await dbConnect();
  try {
    let allProducts = await productModal.find();

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).send(error, " in getting all products");
  }
}
