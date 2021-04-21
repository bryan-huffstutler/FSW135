const express = require("express")
const inventoryRouter = express.Router()
const Inventory = require('../models/inventory')

//Get All
inventoryRouter.get("/", (req, res, next)=> {
  Inventory.find((err, inventory) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.send(inventory)
  })  
})

//Get One
inventoryRouter.get('/:inventoryId', (req, res, next) => {
  Inventory.find({_id: req.params.inventoryId}, (err, inventoryItem) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.send(inventoryItem)
  })
})

//Post
inventoryRouter.post("/", (req, res, next) => {
  const newInventory = new Inventory(req.body)
  newInventory.save((err, savedInventory) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedInventory)
  })
})

//Update
inventoryRouter.put("/:inventoryId", (req, res, next) => {
  Inventory.findOneAndUpdate(
    {_id: req.params.inventoryId},
    req.body,
    {new: true},
    (err, updatedInventory) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedInventory)
    }
  )
})

//Delete One
inventoryRouter.delete("/:inventoryId", (req, res, next) => {
  Inventory.findOneAndDelete(
    {_id: req.params.inventoryId},
    (err, deletedItem) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database.`)
    }
  )
})

module.exports = inventoryRouter