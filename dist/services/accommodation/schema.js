"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccommodationModel = exports.AccommodationSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
exports.AccommodationSchema = new mongoose_2.default.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true }
}, { timestamps: true });
exports.AccommodationModel = (0, mongoose_1.model)("accommodation", exports.AccommodationSchema);
