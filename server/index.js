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


// verify jwt token
const verifyToken = (req,res,next) => {
  console.log('this is a middleware');
       // token verification 
       const token = req.cookies?.token;  // token is received from the browser's cookie
       console.log('token from browser', token);
       if(!token) return res.status(401).send({message : "token nai Dhukte parba naaaa"})

       if(token) {
         jwt.verify(token, process.env.ACCESS_TOKEN, (err,decoded)=> {
           if(err) {
            console.log(err);
             return res.status(401).send({message : "Vul token niye ashcho"})
           }

           console.log(decoded);
           req.user = decoded
           next()
         })
       }
}


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
        const userEmail = req.body;
        const token = jwt.sign(userEmail,process.env.ACCESS_TOKEN,{expiresIn:'365d'})

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
      app.get('/jobs/:email',verifyToken, async(req,res) => {
        const tokenEmail = req.user.email;
        console.log('this email is from inside the token data',tokenEmail);

        const email = req.params.email;

        if(tokenEmail !== email) {
          return res.status(403).send({message : "token email match kore nai, forbidden"})
        }

        const query = { 'buyer.email' : email }   // query from database 
        const result = await jobsCollection.find(query).toArray()
        res.send(result)
      })


      // delete a job from database using id
      app.delete('/job/:id',verifyToken, async(req,res)=> {
        const id = req.params.id;
        const query = { _id : new ObjectId(id)}   // delete query from database using id
        const result = await jobsCollection.deleteOne(query);
        res.send(result);
      })


      // update a job using job id
      app.put('/job/:id',verifyToken, async(req,res) => {
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

        // check if dupicate bid is present already in db
        const query = {
          email : bidData.email,
          jobId : bidData.jobId
         }
         const alreadyApplied = await bidsCollection.findOne(query)
         if(alreadyApplied) {
          return res.status(400).send({message : 'Bid already been placed on this job'})
         }
         
        const result = await bidsCollection.insertOne(bidData);
        res.send(result)
      })


      // get all bids from db using user email
      app.get('/my-bids/:email',verifyToken, async(req,res)=> {
        const email = req.params.email;
        const query = { 'email' : email };  // according to email of who places the bid
        const result = await bidsCollection.find(query).toArray();
        res.send(result);
      } )


      // get all bid requests from db using buyer's (owner) email
      app.get('/bid-requests/:email',verifyToken, async(req,res)=> {
        const email = req.params.email;
        const query = { 'buyer.email' : email };  // according to email of who places the bid
        const result = await bidsCollection.find(query).toArray();
        res.send(result);
      } )


      // update bid status (patch for any specific data needs to be updated)
      app.patch('/bid/:id',verifyToken, async(req,res) => {
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



                              // pagination 

         // get all jobs data from Db for pagination
      app.get('/all-jobs', async(req,res) => {
        const size = parseInt(req.query.size);
        const page = parseInt(req.query.page) - 1;
        console.log(size, page);
        const result = await jobsCollection.find().skip(page * size).limit(size).toArray()
        res.send(result)
      })   
      
      
        // get all jobs data count from Db
        app.get('/jobs-count', async(req,res) => {
          const count = await jobsCollection.countDocuments()
          res.send({count})
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

