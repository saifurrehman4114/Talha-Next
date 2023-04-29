let { definingSchema } = require("../../../schema");
let { brandModal } = definingSchema();
let { dbConnect } = require("../../../util/connect");
export default async function getBrand(req, res) {
  await dbConnect();

  try {
    const brands = await brandModal.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).send(error, "in getting brand ");
  }
}
