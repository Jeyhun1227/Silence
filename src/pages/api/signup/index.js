import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ramca0909@gmail.com",
    pass: "tdxodeyseblvgqzi"
  }
});

export default (req, res) => {
  if (req.body.action === 'buy_product'){
    console.log(req.body);
    const lead = req.body.lead;
    const userEmail = lead.email;
    const pricetier = req.body.action_details.transaction_details.price;

    const payload = {
      email: userEmail,
      first_name: lead.first_name,
      last_name: lead.last_name,
      price: pricetier
    };

    const token = jwt.sign(payload, 'J7kRmPnQsW4tY8zX');

    const link = `https://www.tinnituspal.com/signup?token=${token}`;
    console.log("link: ", link);

    let mailOptions = {
      from: "ramca0909@gmail.com",
      to: userEmail,
      subject: "Please Sign Up to Tinnitus Pal!",
      text: link,
      html: `
      <p>Follow this link to Sign Up:</p>
      <p><a href='${link}'>SignUp</a></p>
      `
    }

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) throw err;
      else console.log(info);
    })

    return res.status(200).json({message: 'Okay'});
  }
  return res.status(200).json({message: "Welcome to Tinnitus API!"});
}