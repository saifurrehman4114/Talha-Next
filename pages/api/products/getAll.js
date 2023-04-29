import { dbConnect } from "@/util/connect";

let { definingSchema } = require("../../../schema");

const { productModal } = definingSchema();

export default async function getAll(req, res) {
  await dbConnect();
  const { brand } = req.body;
  try {
    let allProducts = await productModal.find({ brand });

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).send(error, " in getting all products");
  }
}
