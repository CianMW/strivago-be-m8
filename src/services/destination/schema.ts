import { model } from "mongoose";
import mongoose from "mongoose"
import { IAccommodation } from "../../interfaces/IAccommodation";
import { IDestModel } from "../../interfaces/IDestModel";

 const DestinationSchema = new mongoose.Schema<IDestModel>({
    city: { type: String, required: true },
    accommodation: [
           {    type: 'ObjectId', ref: 'Accommodation' }
    ]
}, { timestamps: true })


export const DestinationModel = model<IDestModel>("Destination", DestinationSchema);

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