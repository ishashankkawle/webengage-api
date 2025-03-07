import express from 'express'
import AppInstance from './initializers/appInstanceInitializer.mjs'


const app = express()
const appInstance = new AppInstance()
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const port = process.env.PORT || 3000;



//--------------------------------------------------------------------
// INITIALIZATION
//--------------------------------------------------------------------
app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})

//--------------------------------------------------------------------
// MIDDLEWARES
//--------------------------------------------------------------------
app.use(express.json({ limit: appInstance.resources.apiConfig.maxPayloadLimit }))  // SET MAX PALOAD LIMIT
app.use(function(req , res , next)  //LOG REQUEST
        {
          let log = { "url" : req.protocol + '://' + req.get('host') + req.originalUrl , "body" : req.body, "method" : req.method }
          console.log(log)
          next();
        })  


//--------------------------------------------------------------------
// HANDLE SOCKET HANG EXCEPTION
//--------------------------------------------------------------------

app.use(function (req, res, next) {
  req.socket.on("error", function () {});
  res.socket.on("error", function () {});
  next();
});

//--------------------------------------------------------------------
// STATUS ROUTES - API
//--------------------------------------------------------------------

app.get('/health', async (req, res) => {
  res.send({ "status": "Online" , "Database" : "Online"})
})

//--------------------------------------------------------------------
// REPO DETAIL ROUTES - API
//--------------------------------------------------------------------

app.get('/generate-csv' , async (req , res) => {
  try 
  {
    let userData = await appInstance.http.httpGet("https://jsonplaceholder.typicode.com/users" , {} , false)
    let postData = await appInstance.http.httpGet("https://jsonplaceholder.typicode.com/posts" , {} , false)
    let commentData = await appInstance.http.httpGet("https://jsonplaceholder.typicode.com/comments" , {} , false)
    userData = userData.map((item) => {return {"id" :item.id , "name" :item.name}})
    postData = postData.map((item) => {return {"id" :item.id , "title" :item.title}})
    commentData = commentData.map((item) => {return {"id" :item.id , "body" :item.body}})
    let output = appInstance.util.mergeArray(userData , postData , "id")
    output = appInstance.util.mergeArray(output , commentData , "id")


    output = appInstance.util.convertJsonToCsv(output , ["id" , "name" , "title" , "body"])
    res.type('text/csv')
    res.send(output)
  } catch (error) {
    console.log({message : error.message , stack: error.stack})
  }
})

//--------------------------------------------------------------------
// POST REQUEST MIDDLEWARES
// 1. 404 - NOT FOUND
// 2. 500 - INTERNAL SERVER ERROR
//--------------------------------------------------------------------

// 404 - Not Found

app.use(function (req, res, next) {
  console.log('Route' + req.url + ' Not found.')
  return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});

// 500 - Any server error
app.use(function (err, req, res, next) {
  console.log(err)
  return res.status(500).send({ error: err });
});