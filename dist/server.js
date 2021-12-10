"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
process.env.TS_NODE_ENV && require("dotenv").config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
//ROUTES
mongoose_1.default.connect(process.env.MONGO_DB_URL);
//connects to the server detailed in the env
const port = process.env.PORT;
mongoose_1.default.connection.on("connected", () => {
    //checks if the connection is established
    console.log("Mongo Connected!");
    server.listen(port, () => {
        console.table((0, express_list_endpoints_1.default)(server));
        console.log(`Server running on port ${port}`);
    });
});
mongoose_1.default.connection.on("error", err => {
    console.log(err);
});
