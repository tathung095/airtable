import * as express from "express";

import route from "./routes";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
require("dotenv").config();

const app = express();
var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

async function loadData() {

    const modelsData = await base('models').select({
        view: "Grid view"
    }).all();
    const modelModelData = await base('model_model').select({
        view: "Grid view"
    }).all();
    const drawingData = await base('drawings').select({
        view: "Grid view"
    }).all();

    app.set('global', { modelsData, modelModelData, drawingData });
    app.listen(process.env.PORT);
    // run app
    console.log(
        "Loaded data successful, server running on ", `http://localhost:${process.env.PORT}`
    );
    // return { modelsData, modelModelData }
}
loadData();

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, GET, POST, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
});

// register all application routes
app.use(route());

app.use(function (req, res, next) {
    res.status(StatusCodes.NOT_FOUND).send({
        error: getReasonPhrase(StatusCodes.NOT_FOUND),
    });
});
