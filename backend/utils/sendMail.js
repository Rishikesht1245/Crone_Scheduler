import nodemailer from "nodemailer";
import Quote from "inspirational-quotes";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.TRANSPORTER_USERNAME,
    pass: process.env.TRANSPORTER_PASSWORD,
  },
});

export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.TRANSPORTER_USERNAME,
    to,
    subject,
    html: text,
  };

  return transporter.sendMail(mailOptions);
};

export const reminderMailTemplate = (name, schedule) => {
  const quote = Quote.getQuote({ author: false });
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reminder Email</title>
</head>
<body style="font-family: Arial, sans-serif;">

  <table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px; background-color: #f0f0f0; text-align: center;">
        <h2>Reminder for Your Schedule</h2>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p>Hello ${name},</p>
        <p>This is a reminder for your schedule ${schedule}.</p>
        <p>Here's an inspiring quote to brighten your day:</p>
        <blockquote style="margin: 20px 0; padding: 10px; border-left: 5px solid #007bff; background-color: #f9f9f9;">
          ${quote?.text}
        </blockquote>
        <p>Best regards,<br>Rsk</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; background-color: #f0f0f0; text-align: center;">
        <p style="font-size: 12px; color: #666;">This email was sent as a reminder for your schedule. If you wish to unsubscribe or change your notification settings, please visit your account settings.</p>
      </td>
    </tr>
  </table>

</body>
</html>
`;
};
