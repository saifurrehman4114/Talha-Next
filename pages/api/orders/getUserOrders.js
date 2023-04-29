import { dbConnect } from "@/util/connect";

const { definingSchema } = require("../../../schema");
const { orderModal } = definingSchema();
export default async function getUserOrders(req, res) {
  await dbConnect();
  let { clientEmail } = req.body;
  console.log(clientEmail);
  try {
    let allUserOrders = await orderModal.find({ clientEmail: clientEmail });
    console.log(allUserOrders);
    res.status(200).json(allUserOrders);
  } catch (error) {
    res.status(500).send(error, " in getting user orders");
  }
}
