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
    const AddUserCollection = client.db('AddUsers').collection('post');
    const ListUserCollection = client.db('Addlist').collection('list');
    

    

  //
  app.get('/startup', async (req, res) => {
    const filter  = req.query.filter || ""
    // console.log(req.query.filter);
    console.log(filter + "FILTER");
    const query ={Industry:{$regex:filter,$options:"i"}}
let cursor

  if(filter !== ''){
    cursor =await NewUserCollection.find(query);
  }else{
    cursor =await NewUserCollection.find();
  }

 const result = await cursor.toArray();
console.log(result);

// const filteredResult = result.filter(item => item.Industry === filter)



//  console.log({filteredResult});
 res.send(result);
})
  app.get('/list', async (req, res) => {
    const cursor = ListUserCollection.find();
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

// mogobd data post 

 // all toy post api  

app.post('/post', async (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  const result = await AddUserCollection.insertOne(newUser);
  res.send(result);
})

// app get user loadata 

app.get('/post', async (req, res) => {
  const cursor = AddUserCollection.find();
  const result = await cursor.toArray();
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