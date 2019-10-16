import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import middleware from "./middleware";
import api from "./api";
import envVariables from "./envVariables";
import db from "./db";


let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan("dev"));

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: envVariables.corsHeaders
  })
);

app.use(
  bodyParser.json({
    limit: envVariables.bodyLimit
  })
);

app.use(middleware({ envVariables, db }));

//middle for checking users

// api router
app.use("/api", api({ envVariables, db }));

//error handling
app.use((err, req, res, next) =>{
  res.status(400).json(err);
});

app.server.listen(process.env.PORT || envVariables.SERVER_PORT, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
