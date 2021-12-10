import { model } from "mongoose";
import mongoose from "mongoose"
import { IAccommodation } from "../../interfaces/IAccommodation";
import { IDestination } from "../../interfaces/IDestination";

export const AccommodationSchema = new mongoose.Schema<IAccommodation>({
    name: { type: String, required: true },
    city: { type: String, required: true }
}, { timestamps: true })


export const AccommodationModel = model<IAccommodation>("accommodation", AccommodationSchema);


