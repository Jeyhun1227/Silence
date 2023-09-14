import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ramca0909@gmail.com",
        pass: "tdxodeyseblvgqzi"
    }
});

export const sender = async (addr) => {

    const payload = { email: addr };
    const secretKey = 'J7kRmPnQsW4tY8zX';
    const options = { expiresIn: '24h' };
    const token = jwt.sign(payload, secretKey, options);

    const link = `https://www.tinnituspal.com/change-password?token=${token}`;

    let mailConf = {
        from: "ramca0909@gmail.com",
        to: addr,
        subject: "Reset Password - Tinnitus Pal",
        text: link,
        html: `
        <h2>Hi!</h2>

        <p>You have just requested a password reset on your account.</p>

        <p>To change your password, please click <a href="${link}">here</a>.</p>

        <p>If you have any issues changing your password or accessing your account, please email: </p>
        <p>support@silencetinnitusnow.com</p>

        <p>Thanks for using Tinnitus Pal, and see you in there,</p>
        <p>Liam Boehm</p>
      `
    }

    transporter.sendMail(mailConf, function (err, info) {
        if (err) return err;
        return info;
    });

    return true;
}