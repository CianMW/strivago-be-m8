"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schema_1 = require("./schema");
const destinationRouter = express_1.default.Router();
destinationRouter
    .get("/", async (req, res) => {
    try {
        const destinations = await schema_1.DestinationModel.find({});
        if (destinations) {
            res.send(destinations);
        }
    }
    catch {
        res.status(404).send();
    }
})
    .post("/", async (req, res) => {
    try {
        const newDestination = new schema_1.DestinationModel(req.body);
        await newDestination.save();
        res.send(201).send(newDestination);
    }
    catch {
        res.status(400).send();
    }
})
    .get("/:city", async (req, res) => {
    const city = req.params.city;
    const destination = await schema_1.DestinationModel.findById({ city: city });
    try {
        if (destination) {
            res.status(200).send(destination);
        }
    }
    catch (error) {
        res.status(404).send(error);
    }
});
exports.default = destinationRouter;
