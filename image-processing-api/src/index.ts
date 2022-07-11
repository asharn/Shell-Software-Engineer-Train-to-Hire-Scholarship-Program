
  import express from 'express';
  const morgan = require("morgan");
  const helmet = require("helmet");
  const cors = require("cors");
  const rateLimit = require("express-rate-limit");

  const app = express();

    //Rate limit for each API'a
    const limiter = rateLimit({
        windowMs: 60 * 1000, // 1 minute
        max: 5, // limit each IP to 2 requests per windowMs
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