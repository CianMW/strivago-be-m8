"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const accommodation_1 = __importDefault(require("./services/accommodation"));
const destination_1 = __importDefault(require("./services/destination"));
process.env.TS_NODE_ENV ? require("dotenv").config() : require("dotenv").config();
console.log(process.env.MONGO_DB_URL);
exports.server = (0, express_1.default)();
exports.server.use((0, cors_1.default)());
exports.server.use(express_1.default.json());
//ROUTES
exports.server.use("/accommodation", accommodation_1.default);
exports.server.use("/destinations", destination_1.default);
