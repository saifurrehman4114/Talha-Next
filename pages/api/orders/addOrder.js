import { dbConnect } from "@/util/connect";

const { definingSchema } = require("../../../schema");
const { orderModal } = definingSchema();
const nodemailer = require("nodemailer");
export default async function addOrder(req, res) {
  await dbConnect();
  let orderDetails = req.body;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "adeenahmad56@gmail.com",
      pass: "ejtrhgrnbzvefdqz",
    },
  });
  let mailOptions = {
    from: "adeenahmad56@gmail.com",
    to: "fa22-bcs-097@cuilahore.edu.pk",
    subject: "Test Email",
    text: "This is a test email sent using Nodemailer in Node.js!",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  try {
    let newOrder = new orderModal(orderDetails);
    await newOrder.save();
    res.status(200).send("new Order saved");
  } catch (error) {
    res.status(500).send(error, " in adding new order");
  }
}
