"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
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
mongoose_1.default.connect(process.env.MONGO_DB_URL);
//connects to the server detailed in the env
const port = process.env.PORT || 3000;
mongoose_1.default.connection.on("connected", () => {
    //checks if the connection is established
    console.log("Mongo Connected!");
    exports.server.listen(port, () => {
        console.table((0, express_list_endpoints_1.default)(exports.server));
        console.log(`Server running on port ${port}`);
    });
});
mongoose_1.default.connection.on("error", err => {
    console.log(err);
});
