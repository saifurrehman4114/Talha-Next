import { dbConnect } from "@/util/connect";

let { definingSchema } = require("../../../schema");
const { productModal } = definingSchema();
export default async function getSome(req, res) {
  await dbConnect();
  const { brand, productName } = req.body;
  console.log(brand, productName);
  try {
    let allProducts = await productModal.find({
      brand,
      name: { $regex: productName, $options: "i" },
    });
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).send(error, " in getting all products");
  }
}
