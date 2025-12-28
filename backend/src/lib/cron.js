import cron from "cron";
import http from "http";

const job = new cron.CronJob("*/14 * * * *", function () {
  http
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) {
        console.log("[Cron] GET request sent successfully");
      } else {
        console.log("[Cron] GET request failed", res.statusCode);
      }
    })
    .on("error", (e) => console.error("[Cron] Error", e.message));
});

export default job;
