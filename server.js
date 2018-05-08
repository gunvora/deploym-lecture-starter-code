import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.json())

console.log(process.env.MONGO_URL)


// const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/mongoLecture"

const mongoUrl = process.env.MONGO_URL || "mongodb://admin:Liselott@ds016108.mlab.com:16108/deployment-lecture"
mongoose.connect(mongoUrl, { useMongoClient: true })
mongoose.Promise = Promise

mongoose.connection.once("open", () => {
  console.log("Connected to mongodb")
})

mongoose.connection.on("error", err => {
  console.error("connection error:", err)
})

const Fruit = mongoose.model("Fruit", {
  name: {
    type: String,
    required: true
  },
  isSour: Boolean,
  rating: Number
})

// const orange = new Fruit({ name: "Orange", isSour: false, rating: 4 })
//
// orange.save().then(() => {
//   console.log("Orange saved!")
// }).catch(err => {
//   console.log("ERROR!!!", err)
// })

app.get("/fruits", (req, res) => {
  Fruit.find().then(allFruits => {
    res.json(allFruits)
  })
})

app.post("/fruits", (req, res) => {
  const fruit = new Fruit(req.body)

  fruit.save().then(() => {
    res.status(201).json({ message: "Created!" })
  }).catch(err => {
    res.status(400).json({ message: "Oh no", errors: err.errors })
  })
})

const port = process.env.PORT || 8080
app.listen(8080)
