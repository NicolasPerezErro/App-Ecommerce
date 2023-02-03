import { createTransport } from "nodemailer";
import config from '../config/config.js'

const HOST = config.HOST_EMAIL;
const PASS = config.PASS_EMAIL;

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: HOST,
        pass: PASS
    }
});

function options(subject, htmlInfo) {
    let mailOptions;
    return mailOptions = {
        from: 'Servidor Node.js',
        to: process.env.TEST_MAIL,
        subject: subject,
        html: htmlInfo
    };

}

async function enviarMail(subject, htmlInfo) {
    await transporter.sendMail(options(subject, htmlInfo));
}


export default enviarMail;