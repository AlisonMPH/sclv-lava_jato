import express from "express";
import routes from "./routes.js";
import errorHandler from '../src/_middleware/error-handler.js';

//import databaseInserts from '../src/config/database-inserts.js';
//databaseInserts();

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(3333);

