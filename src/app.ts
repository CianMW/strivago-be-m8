import express from "express"
import cors from "cors"
import accomRouter from "./services/accommodation";
import destRouter from "./services/destination";


process.env.TS_NODE_ENV ? require("dotenv").config() : require("dotenv").config()

console.log(process.env.MONGO_DB_URL)
export const server = express()



server.use(cors())
server.use(express.json())

//ROUTES
server.use("/accommodation", accomRouter)
server.use("/destinations", destRouter)

