
  import express from 'express';
  const morgan = require("morgan");
  const helmet = require("helmet");
  const cors = require("cors");

  const app = express();

  // Middlewares
  app.use(morgan("common"));
  app.use(helmet());
  app.use(cors());

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