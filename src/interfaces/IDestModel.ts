import {Types} from "mongoose"

export interface IDestModel {
    city: string
    accommodation?: Types.ObjectId
}

