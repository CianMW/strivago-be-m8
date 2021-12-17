import { model } from "mongoose";
import mongoose from "mongoose"
import { IAccModel } from "../../interfaces/IAccModel";

export const AccommodationSchema = new mongoose.Schema<IAccModel>({
    name: { type: String, required: true },
    city: { type: String, required: true }
}, { timestamps: true })

export const AccommodationModel = model<IAccModel>("accommodation", AccommodationSchema);


