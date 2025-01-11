const express = require('express')
const cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const port  = process.env.PORT || 5000;
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const corsOption = {
    origin : ['http://localhost:5173'],
    credentials : true,
    optionSuccessStatus : 200,
}

app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())

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

      // jwt generate
      app.post('/jwt', async(req,res) => {
        const user = req.body;
        const token = jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'365d'})

        res.cookie('token' , token, {
          httpOnly : true,
          secure : process.env.NODE_ENV === 'production'? 'none' : 'strict',
          sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }).send({success:true})
      })

      // clear token on logout
      app.get('/logout', async(req,res) => {
        res.clearCookie('token', {
          httpOnly : true,
          secure : process.env.NODE_ENV === 'production'? 'none' : 'strict',
          sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          maxAge : 0
        }).send({success:true})
      })

  
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


      // save a job into database
      app.post('/job', async(req,res) => {
        const jobData = req.body;
        const result = await jobsCollection.insertOne(jobData);
        res.send(result)
      })


      // get jobs posted by specific user using email
      app.get('/jobs/:email', async(req,res) => {
        const token = req.cookies?.token;
        console.log('token from browser', token);
        if(token) {
          jwt.verify(token, process.env.ACCESS_TOKEN, (err,decoded)=> {
            if(err) {
              return console.log(err);
            }
            
            console.log(decoded);
          } )
        }

        const email = req.params.email;
        const query = { 'buyer.email' : email }   // query from database 
        const result = await jobsCollection.find(query).toArray()
        res.send(result)
      })


      // delete a job from database using id
      app.delete('/job/:id', async(req,res)=> {
        const id = req.params.id;
        const query = { _id : new ObjectId(id)}   // delete query from database using id
        const result = await jobsCollection.deleteOne(query);
        res.send(result);
      })


      // update a job using job id
      app.put('/job/:id', async(req,res) => {
        const id = req.params.id;
        const jobData = req.body;
        const query = {_id : new ObjectId(id)};
        const options = {upsert : true};
        const updateDoc = {
          $set : {
            ...jobData
          }
        }

        const result = await jobsCollection.updateOne(query, updateDoc, options)
        res.send(result)
      })


                                    // bid related api

      

      // save bid data into database
      app.post('/bid', async(req,res) => {
        const bidData = req.body;
        // console.log(bidData);  // data will be coming from front-end inside the req.body
        const result = await bidsCollection.insertOne(bidData);
        res.send(result)
      })


      // get all bids from db using user email
      app.get('/my-bids/:email', async(req,res)=> {
        const email = req.params.email;
        const query = { 'email' : email };  // according to email of who places the bid
        const result = await bidsCollection.find(query).toArray();
        res.send(result);
      } )


      // get all bids from db using buyer's email
      app.get('/bid-requests/:email', async(req,res)=> {
        const email = req.params.email;
        const query = { 'buyer.email' : email };  // according to email of who places the bid
        const result = await bidsCollection.find(query).toArray();
        res.send(result);
      } )


      // update bid status (patch for any specific data needs to be updated)
      app.patch('/bid/:id', async(req,res) => {
        const id = req.params.id;
        const status = req.body;
        const query = {_id : new ObjectId(id)};
        const updateDoc = {
          $set : status
        }
        const result = await bidsCollection.updateOne(query,updateDoc)
        res.send(result)
        // query দ্বারা id দিয়ে খুজেবো,পরে updateDoc এর মধ্যে কোন ভ্যালু কে আপডেট করতে চাই সেটি $set দিয়ে আপডেট করতে হবে 
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

