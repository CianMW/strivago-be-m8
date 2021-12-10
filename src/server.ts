
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints";

import {server} from "./app"

process.env.TS_NODE_ENV ? require("dotenv").config() : require("dotenv").config()

mongoose.connect(process.env.MONGO_DB_URL!)
//connects to the server detailed in the env

const port = process.env.PORT! || 3100

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

