"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    .get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accommodationList = yield schema_1.AccommodationModel.find({});
        if (accommodationList) {
            res.send(accommodationList);
        }
    }
    catch (error) {
        res.status(404).send();
    }
}))
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const singleAccommodation = yield schema_1.AccommodationModel.findById(id);
        if (singleAccommodation) {
            res.status(200).send(singleAccommodation);
        }
    }
    catch (error) {
        res.status(404).send();
    }
}))
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try { }
    catch (error) {
        res.status(400).send();
    }
    const newAccommodation = new schema_1.AccommodationModel(req.body);
    yield newAccommodation.save();
    res.status(201).send(newAccommodation);
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedPost = yield schema_1.AccommodationModel.deleteOne({ _id: id });
        if (deletedPost) {
            res.status(204).send(`Post with id: ${id} has been deleted `);
        }
        // } else {
        //   next(createHttpError(404, `post: ${id} not found!`))
        // }
    }
    catch (error) {
        res.status(404).send();
    }
}))
    .put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedPost = yield schema_1.AccommodationModel.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedPost) {
            res.status(201).send(updatedPost);
        }
        // else {
        //   next(createHttpError(404, `product: ${id} not found!`))
        // }
    }
    catch (error) {
        res.status(404).send();
    }
}));
exports.default = AccomRouter;
