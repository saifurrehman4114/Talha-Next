import { dbConnect } from "@/util/connect";

const { definingSchema } = require("../../../schema");
const { orderModal } = definingSchema();
const nodemailer = require("nodemailer");
export default async function (req, res) {
  await dbConnect();
  let { orderId, newStatus } = req.body;
  let user = await orderModal.findOne({ _id: orderId });
  let clientEmail = user.clientEmail;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "adeenahmad56@gmail.com",
      pass: "ejtrhgrnbzvefdqz",
    },
  });
  let mailOptions = {
    from: "adeenahmad56@gmail.com",
    to: clientEmail,
    subject: "YOUGEE",
    text: "Your order has been packed and ready to deliver! It will hopefully arive within 7 days. Thanks for your patience we hope that our product will reach upto your expectation!!",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  try {
    await orderModal.findByIdAndUpdate({ _id: orderId }, { status: newStatus });
    res.status(200).send("Order status successfully changed");
  } catch (error) {
    res.status(500).send(error, " in changing status of order");
  }
}
