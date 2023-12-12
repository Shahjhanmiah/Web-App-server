const express = require("express");
const app = express();
require('dotenv').config
const cors = require("cors")
const { MongoClient, ServerApiVersion, LEGAL_TCP_SOCKET_OPTIONS,ObjectId } = require('mongodb');
const port = process.env.Port || 5000;

// middware
app.use(express.json())
app.use(cors())


const uri = "mongodb+srv://WebApp:rQxWJvbjNxtyzAJu@cluster0.ga6ydds.mongodb.net/?retryWrites=true&w=majority";
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

    const NewUserCollection = client.db('Directoryname').collection('startup');

    


  //
  app.get('/startup', async (req, res) => {
    const cursor = NewUserCollection.find();
    const result = await cursor.toArray();
    res.send(result);
})

// speick id database 

// all toy route id 
app.get('/startup/:id', async(req, res) => {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await NewUserCollection.findOne(query);
  res.send(result);
})

 


   
  }
  finally {




  }
}
run().catch(error => console.log(error))



app.get('/', (req, res) => {
  res.send("Web.js")


})





app.listen(port, () => {
  console.log(`Web is running Port${port}`)
})




// user name Node
// user passoword n6JVgGYbrZ1VsPFc