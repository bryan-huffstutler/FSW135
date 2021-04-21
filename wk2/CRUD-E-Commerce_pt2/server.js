const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

// Middleware
app.use(express.json())
app.use(morgan('dev'))

//Connect to DB
mongoose.connect('mongodb://localhost:27017/inventorydb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  },
  () => console.log('connected to DB'))

app.use("/inventory", require("./routes/inventoryRouter"))

//Error Handler
app.use((err, req, res, next) => {
  console.log(err)
  return res.send({errMsg: err.message})
})

app.listen(9000, () => {
  console.log("Server is running on Port: 9000")
})