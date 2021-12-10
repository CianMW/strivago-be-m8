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
  .get("/:id", async (req, res) => {
    const destination = await DestinationModel.findById(req.params.id);
    try {
        if (!destination) {
          res.status(404).send();
        } 
    } catch {
        res.send(destination);
    }
  });

export default destinationRouter;
