import { dbConnect } from "@/util/connect";

const { definingSchema } = require("../../../schema");
const { productModal } = definingSchema();

export default async function addProduct(req, res) {
  await dbConnect();
  try {
    const newProduct = new productModal(req.body);
    await newProduct.save();
    res.status(200).send("Product successfully added");
  } catch (error) {
    res.status(500).send(error, "in adding product");
  }
}
