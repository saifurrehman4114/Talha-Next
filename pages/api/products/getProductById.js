import { dbConnect } from "@/util/connect";

let { definingSchema } = require("../../../schema");
const { productModal } = definingSchema();
export default async function getProductById(req, res) {
  await dbConnect();
  let { productId } = req.body;
  try {
    let products = await productModal.find({ _id: productId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error, " in getting some product");
  }
}
