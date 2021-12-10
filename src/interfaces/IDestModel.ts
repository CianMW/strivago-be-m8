import {Types} from "mongoose"

export interface IDestModel {
    name: string
    accommodation?: Types.ObjectId
}

