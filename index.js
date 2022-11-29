const express = require('express')


const app = express()
const parkings = require('./parkings.json')
const mongo = require("mongodb").MongoClient
//const url = "mongodb+srv://karima:FACbKgICbu6dBd20@clusternode.kfee5.mongodb.net/?retryWrites=true&w=majority";
const url = 'mongodb://mongo:27017';
let db, parking

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db("parkings")
    parking = db.collection("parking")
   
  }
)
// Middleware
app.use(express.json())


app.get("/parking", (req, res) => {
  console.log(parking)
  parking.insertOne({ name: "parking3",type:"Area", city:"Bizerte", id:4 })
    parking.find().toArray((err, items) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      res.status(200).json({ parking: items })
    })
  })




app.get('/parkings', (req,res) => {
    res.status(200).json(parkings)
})

app.get('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})

app.post('/parkings', (req,res) => {
    parkings.push(req.body)
    res.status(200).json(parkings)
})

app.put('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parking.name =req.body.name,
    parking.city =req.body.city,
    parking.type =req.body.type,
    res.status(200).json(parking)
})

app.delete('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parkings.splice(parkings.indexOf(parking),1)
    res.status(200).json(parkings)
})

app.listen(3080, () => {
  console.log('Serveur à l\'écoute')
})

module.exports = app;
