const express = require('express')
const cors = require('cors')
require('dotenv').config()

const port  = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()

const corsOption = {
    origin : ['http://localhost:5173'],
    credentials : true,
    optionSuccessStatus : 200,
}

app.use(cors(corsOption))
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ddujh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {

    try {
      const jobsCollection = client.db('jobSphere').collection('jobs')
      const bidsCollection = client.db('jobSphere').collection('bids')

  
      // get all jobs data from Db
      app.get('/jobs', async(req,res) => {
        const result = await jobsCollection.find().toArray()
        res.send(result)
      })


      // get a single job data from db using job id
      app.get('/job/:id', async(req,res) => {
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await jobsCollection.findOne(query);
        res.send(result)
      })



      // save bid data into database
      app.post('/bid', async(req,res) => {
        const bidData = req.body;
        console.log(bidData);  // data will be coming from front-end inside the req.body

        const result = await bidsCollection.insertOne(bidData);
        res.send(result)
      })





      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } 
    




    finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req,res) => {
    res.send('solo-Sphere is running')
})






app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
})

