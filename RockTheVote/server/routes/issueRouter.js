const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')

//Get All

issueRouter.get('/', (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

//Get all by user
issueRouter.get('/user/:userId', (req, res, next) => {
  Issue.find({user: req.params.userId},(err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

//Get One

issueRouter.get('/:issueId', (req, res, next) => {
  Issue.findOne({_id: req.params.issueId}, (err, issue)=> {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issue)
  })
})

//Post

issueRouter.post('/', (req, res, next)=> {
  req.body.user = req.user._id
  req.body.username = req.user.username
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

//Update

issueRouter.put('/:issueId', (req, res, next)=>{
  Issue.findOneAndUpdate(
    {_id: req.params.issueId},
    req.body,
    {new: true},
    (err, updatedIssue)=> {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedIssue)
  })
})

//Add Like
issueRouter.put('/likes/:issueId', (req, res, next) => {
  Issue.findOneAndUpdate(
    {_id: req.params.issueId},
    {$inc: {likes: 1}},
    {new: true},
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedIssue)
    }
  )
})

//Add Dislike
issueRouter.put('/dislikes/:issueId', (req, res, next) => {
  Issue.findOneAndUpdate(
    {_id: req.params.issueId},
    {$inc: {dislikes: 1}},
    {new: true},
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedIssue)
    }
  )
})

//Delete
issueRouter.delete('/:issueId', (req, res, next)=> {
  Issue.findOneAndDelete(
    {_id: req.params.issueId},
    (err, deletedItem)=>{
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted ${deletedItem} from the database.`)
    }
  )
})

module.exports = issueRouter