const { definingSchema } = require("../../../schema");
const { productModal } = definingSchema();
const cors = require("cors");
export default async function changePrice(req, res) {
  cors()(req, res, async () => {
    await dbConnect();
    const { productId, newPrice } = req.body;
    try {
      await productModal.findOneAndUpdate(
        { _id: productId },
        { price: newPrice }
      );
      res.status(200), send("Product Price Updated");
    } catch (error) {
      res.status(500).send(error, "error in updating price");
    }
  });
}
