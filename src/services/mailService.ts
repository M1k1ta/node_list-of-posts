import nodemailer from 'nodemailer';
import 'dotenv/config';
import { Message } from '../types/message';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const send = ({ email, subject, html }: Message) => {
  return transporter.sendMail({
    from: 'Project almost like a telegram, without chat',
    to: email,
    subject,
    text: '',
    html,
  });
};

export const sendInvitation = (email: string, roomId: number, fromUser: string, roomName: string) => {
  const link = `${process.env.CLIENT_URL}/room/${roomId}`;

  return send({
    email,
    subject: 'Invitation',
    html: `
      <h1>Invitation ${fromUser} to ${roomName}</h1>
      <a href="${link}">${link}</a>
    `,
  });
};
