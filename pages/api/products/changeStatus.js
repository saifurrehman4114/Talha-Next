import { dbConnect } from "@/util/connect";
import cors from "cors";
let { definingSchema } = require("../../../schema");
const { productModal } = definingSchema();

export default async function changeStatus(req, res) {
  cors()(req, res, async () => {
    await dbConnect();
    const { productId, status, price } = req.body;
    try {
      await productModal.findOneAndUpdate(
        { _id: productId },
        { status: status, price: price }
      );
      res.status(200).send("Product status and price successfully changed");
    } catch (error) {
      res.status(500).send(error, "error in changing status of product");
    }
  });
}
