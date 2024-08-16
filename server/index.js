const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

const port = process.env.PORT || 8000

// middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174','https://digish0p.web.app'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nsswhi9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  const productCollection = client.db("digiShop").collection("products");
  const usersCollection = client.db("digiShop").collection("users");
  const categoriesCollection = client.db("digiShop").collection("categories");
  const brandCollection = client.db("digiShop").collection("brands");
  try {
    // auth related api
    
    // Logout
    app.get('/logout', async (req, res) => {
      try {
        res
          .clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          })
          .send({ success: true })
        console.log('Logout successful')
      } catch (err) {
        res.status(500).send(err)
      }
    })
    //user registration
    app.post("/users/register", async (req, res) => {
      const { name, password, mobile, email, image_url } = req.body;

      const exist = await usersCollection.findOne({ mobile: mobile });
      if (exist) {
        return res
          .status(400)
          .json({ message: "the number is already in use." });
      }
      const existEmail = await usersCollection.findOne({ email: email });
      if (existEmail) {
        return res
          .status(400)
          .send({ message: "the Email is already in use." });
      }

      const newUser = req.body;

      await usersCollection.insertOne(newUser);
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    });
    //products
    app.get("/products", async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/categories", async (req, res) => {
      const cursor = categoriesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/brands", async (req, res) => {
      const cursor = brandCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello from digiShop Server..')
})

app.listen(port, () => {
  console.log(`digiShop is running on port ${port}`)
})
