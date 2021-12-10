import express from "express"
import createHttpError from "http-errors"
import { AccommodationModel } from "./schema"




const AccomRouter = express.Router()

AccomRouter
.get("/", async (req, res, next) => {
    const products = await AccommodationModel.find({});
    res.send(products);
  })









export default AccomRouter