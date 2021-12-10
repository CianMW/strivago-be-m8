"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schema_1 = require("./schema");
/* NOTES:
    - id is always sent in the params not in the body */
const AccomRouter = express_1.default.Router();
AccomRouter
    .get("/", async (req, res, next) => {
    try {
        const accommodationList = await schema_1.AccommodationModel.find({});
        if (accommodationList) {
            res.send(accommodationList);
        }
    }
    catch (error) {
        res.status(404).send();
    }
})
    .get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const singleAccommodation = await schema_1.AccommodationModel.findById(id);
        if (singleAccommodation) {
            res.status(201).send(singleAccommodation);
        }
    }
    catch (error) {
        res.status(404).send();
    }
})
    .post("/", async (req, res) => {
    try {
        const newAccommodation = new schema_1.AccommodationModel(req.body);
        await newAccommodation.save();
        res.status(201).send(newAccommodation);
    }
    catch (error) {
        res.status(400).send();
    }
})
    .delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAccom = await schema_1.AccommodationModel.deleteOne({ _id: id });
        if (deletedAccom) {
            res.status(204).send(`Post with id: ${id} has been deleted `);
        }
    }
    catch (error) {
        res.status(404).send();
    }
})
    .put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedAccom = await schema_1.AccommodationModel.findByIdAndUpdate(id, ...req.body, { new: true });
        if (updatedAccom) {
            res.status(201).send(updatedAccom);
        }
    }
    catch (error) {
        res.status(404).send();
    }
});
exports.default = AccomRouter;
