import { dbConnect } from "@/util/connect";

const { definingSchema } = require("../../../schema");
const { orderModal } = definingSchema();

export default async function getOrders(req, res) {
  await dbConnect();
  try {
    let allOrders = await orderModal.find();
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).send(error, " in getting all orders");
  }
}
