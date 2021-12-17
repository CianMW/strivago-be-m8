"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const DestinationSchema = new mongoose_2.default.Schema({
    city: { type: String, required: true },
    accommodation: [
        { type: 'ObjectId', ref: 'Accommodation' }
    ]
}, { timestamps: true });
exports.DestinationModel = (0, mongoose_1.model)("Destination", DestinationSchema);
// // `Parent` represents the object as it is stored in MongoDB
// interface Parent {
//   child?: Types.ObjectId,
//   name?: string
// }
// const ParentModel = model<Parent>('Parent', new Schema({
//   child: { type: 'ObjectId', ref: 'Child' },
//   name: String
// }));
// interface Child {
//   name: string;
// }
// const childSchema: Schema = new Schema({ name: String });
// const ChildModel = model<Child>('Child', childSchema);
// // Populate with `Paths` generic `{ child: Child }` to override `child` path
// ParentModel.findOne({}).populate<{ child: Child }>('child').orFail().then(doc => {
//   // Works
//   const t: string = doc.child.name;
// });
