import express from "express"
import createHttpError from "http-errors"
import { AccommodationModel } from "./schema"



/* NOTES:
    - id is always sent in the params not in the body */
const AccomRouter = express.Router()

AccomRouter
.get("/", async (req, res, next) => {
    try{
const accommodationList = await AccommodationModel.find({});
    if( accommodationList){
        res.send(accommodationList);
    }
 
    } catch(error){
        res.status(404).send()
    }
    
  })
  .get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const singleAccommodation = await AccommodationModel.findById(id);
      if (singleAccommodation) {
        res.status(201).send(singleAccommodation);
      }
    } catch (error) {
      res.status(404).send();
    }
  })
  .post("/", async (req, res) => {
      try{
        const newAccommodation = new AccommodationModel(req.body);
            await newAccommodation.save();
            res.status(201).send(newAccommodation);

      } catch(error) {
          res.status(400).send()
      }
    
  })
  .delete("/:id", async (req, res) => {
    try {
      const id = req.params.id
      const deletedAccom = await AccommodationModel.deleteOne({_id: id})

      if (deletedAccom) {
        res.status(204).send(`Post with id: ${id} has been deleted `)
      }
    } catch (error) {
     res.status(404).send()
    }
  })
  .put("/:id", async (req, res, next) => {
    try {
      const id = req.params.id
      const updatedAccom = await AccommodationModel.findByIdAndUpdate(id, ...req.body, { new: true })

      if (updatedAccom) {
        res.status(201).send(updatedAccom)
      } 
    } catch (error) {
     res.status(404).send()
    }
  })










export default AccomRouter