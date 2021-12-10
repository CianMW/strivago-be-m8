import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints";
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


mongoose.connect(process.env.MONGO_DB_URL!)
//connects to the server detailed in the env

const port = process.env.PORT! || 3000

mongoose.connection.on("connected", () => {
    //checks if the connection is established
  console.log("Mongo Connected!")

  server.listen(port, () => {
    console.table(listEndpoints(server))

    console.log(`Server running on port ${port}`)
  })
})

mongoose.connection.on("error", err => {
  console.log(err)
})

