import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/routes";
import cron from 'node-cron';
import { schedulerd } from "./Schedulerdb";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json())
app.use(router);

//running task every day at 23.59 pm
cron.schedule('59 23 * * *', function () {
  schedulerd();
});

// cron.schedule('* * * * * *', function() {
//     console.log('Running task every second');
//   });


const port = process.env.PORT_APP || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
