import { dbConnect } from "@/util/connect";

let { definingSchema } = require("../../../schema");
const { productModal } = definingSchema();

export default async function getSingle(req, res) {
  await dbConnect();
  let { productName } = req.body;
  console.log(productName);
  try {
    let products = await productModal.find({ name: { $regex: productName } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error, " in getting some product");
  }
}
