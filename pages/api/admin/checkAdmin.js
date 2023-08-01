import cors from "cors";

export default async function checkAdmin(req, res) {
  cors()(req, res, async () => {
    const { username, password } = req.body;
    const USERID = process.env.USERID;
    const PASSWORD = process.env.PASSWORD;
    console.log(USERID, PASSWORD);

    if (USERID === username && PASSWORD === password) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  });
}
