import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/v1";
import connectToDatabase from "./lib/database";
import ExpressMongoSanitize = require("express-mongo-sanitize");
import { errorHandler } from "./middlewares/error";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./docs/swagger";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(ExpressMongoSanitize());

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/images", express.static("public/images"));
app.use("/v1", routes);

app.use(errorHandler);

const port = process.env.PORT || 3001;

connectToDatabase(process.env.MONGODB_URI || "").then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
