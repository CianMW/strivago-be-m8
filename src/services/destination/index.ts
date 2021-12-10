import express from "express";
import createHttpError from "http-errors";
import { DestinationModel } from "./schema";

const destinationRouter = express.Router();

destinationRouter
  .get("/", async (req, res) => {
    try {
      const destinations = await DestinationModel.find({});
      if (destinations) {
        res.send(destinations);
      }
    } catch {
      res.status(404).send();
    }
  })
  .post("/", async (req, res) => {
    try {
        const newDestination = new DestinationModel(req.body)
        await newDestination.save()
        res.send(201).send(newDestination)
    } catch {
        res.status(400).send()
    }
  })
  .get("/:city", async (req, res) => {
    const city = req.params.city
    const destination = await DestinationModel.findById({city : city});
    try {
        if (destination) {
          res.status(200).send(destination);
        } 
    } catch(error) {
        res.status(404).send(error);
    }
  });

export default destinationRouter;
