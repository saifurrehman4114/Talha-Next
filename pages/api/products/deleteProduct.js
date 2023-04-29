import { dbConnect } from "@/util/connect";

let { definingSchema } = require("../../../schema");
const { productModal } = definingSchema();
export default async function deleteProduct(req, res) {
  await dbConnect();
  const { productId } = req.body;
  try {
    await productModal.deleteOne({ _id: productId });
    res.status(200).send("Product successfully deleted");
  } catch (error) {
    res.status(500).send(error, "Error in deleting product");
  }
}
