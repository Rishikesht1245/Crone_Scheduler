import cron from "node-cron";
import Schedule from "../models/schedule.model.js";
import { reminderMailTemplate, sendEmail } from "./sendMail.js";

const checkAndSendMails = async () => {
  const today = new Date();
  //   start of the day 00:00
  const todayStart = today.setHours(0, 0, 0, 0);
  // end of the day 23:59
  const todayEnd = today.setHours(23, 59, 59, 999);

  const schedulesForToday = await Schedule.find({
    date: { $gte: todayStart, $lte: todayEnd },
  }).populate({ path: "userId", select: "-password" });

  schedulesForToday.forEach(async (schedule) => {
    const to = schedule?.userId?.email;
    const user = schedule?.userId?.name;
    const subject = `Reminder for your schedule ${schedule?.name}`;
    const text = reminderMailTemplate(user, schedule?.name);
    sendEmail(to, subject, text);
    console.log("Mail send successful!");

    //scheduling next reminder if it repeating
    if (schedule?.type !== "none") {
      let currentDate = new Date(schedule.date);
      let nextDate = new Date(currentDate);
      switch (schedule?.type) {
        case "daily":
          nextDate.setDate(currentDate.getDate() + 1);
          break;
        case "weekly":
          nextDate.setDate(currentDate.getDate() + 7);
          break;
        case "monthly":
          nextDate.setMonth(currentDate.getMonth() + 1);
          break;
        default:
          return null;
      }

      await Schedule.findByIdAndUpdate(schedule._id, { date: nextDate });
    }
  });
};

const runJobs = () => {
  cron.schedule("0 * * * *", () => {
    console.log("cron jobs running");
    checkAndSendMails();
  });
};

export default runJobs;
