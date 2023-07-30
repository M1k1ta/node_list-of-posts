"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInvitation = exports.send = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});
const send = ({ email, subject, html }) => {
    return transporter.sendMail({
        from: 'Project almost like a telegram, without chat',
        to: email,
        subject,
        text: '',
        html,
    });
};
exports.send = send;
const sendInvitation = (email, roomId, fromUser, roomName) => {
    const link = `${process.env.CLIENT_URL}/room/${roomId}`;
    return (0, exports.send)({
        email,
        subject: 'Invitation',
        html: `
      <h1>Invitation ${fromUser} to ${roomName}</h1>
      <a href="${link}">${link}</a>
    `,
    });
};
exports.sendInvitation = sendInvitation;
