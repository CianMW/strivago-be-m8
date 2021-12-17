"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const app_1 = require("./app");
process.env.TS_NODE_ENV ? require("dotenv").config() : require("dotenv").config();
mongoose_1.default.connect(process.env.MONGO_DB_URL);
//connects to the server detailed in the env
const port = process.env.PORT || 3100;
mongoose_1.default.connection.on("connected", () => {
    //checks if the connection is established
    console.log("Mongo Connected!");
    app_1.server.listen(port, () => {
        console.table((0, express_list_endpoints_1.default)(app_1.server));
        console.log(`Server running on port ${port}`);
    });
});
mongoose_1.default.connection.on("error", err => {
    console.log(err);
});
