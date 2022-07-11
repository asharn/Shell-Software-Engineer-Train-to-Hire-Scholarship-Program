
  import express from 'express';
  import morgan from "morgan";
  import helmet from "helmet";
  import cors from "cors";
  import rateLimit from "express-rate-limit";
  import sharp from 'sharp';

  const app = express();

    //Rate limit for each API's to stop D-Dos attack
    const limiter = rateLimit({
        windowMs: 60 * 1000, // 1 minute
        max: 5, // limit each IP to 5 requests per windowMs
        message: "Too many request created from this IP, please try again after a minute"
      });

  // Middlewares
  app.use(morgan("common"));
  app.use(helmet());
  app.use(cors());
  app.use(limiter); //  apply to all requests

  // Port
  const port = 3000;


  app.get("/", (req, res) => {
    res.json({
      message: "Hello Stranger! How are you?",
    });
  });

  app.get('/route', (req, res) => {
    res.send('Hello, You called, api route!');
   });

   app.listen(port, ()=> {
    console.log(`Server started at localhost:${port}`)
   });