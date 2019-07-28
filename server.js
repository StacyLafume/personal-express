const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = 'mongodb+srv://Stacy:Thepass@cluster0-x3ldo.mongodb.net/freewrite?retryWrites=true&w=majority';
const dbName = "freewrite";
console.log("url", url);

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))//connect client side code

app.listen(10000, () => {
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if(error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});
app.get('/', (req, res) => {
  //console.log(db)
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)

    console.log("These are the todos", result)

      res.render('quotes.ejs', {stories: result})
  })
})


//curl -X post -d "quote=Be+prepared&post=newpost" http://localhost:10000/posts

// sends todos to the data base
// app.post('/posts', (req, res) => {
//   console.log("this is a quote", req.body.quote,"this is a post",req.body.post)
//   db.collection('quotes').updateOne(
//     { quote: "q1" },
//     { "$push": {  posts: req.body.post }},
//     (err, response) => {
//       if (err) return console.log(err)
//       console.log('saved to database',response.result)
//       res.redirect('/')
//     })
//   })

  //posting for the image and story
  app.post('/random', (req, res) => {
    //console.log("posting image")
    db.collection('quotes').save({image: req.body.img, passage: req.body.story, like: false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database', result)
    res.redirect('/quotes')
      })
    })

    app.put('/like', (req, res) => {
      db.collection('quotes')
      .findOneAndUpdate({image: req.body.img, passage: req.body.story}, {
        $set: {
          like: true
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/pro')
      })
    })


  // this is the updates the do w/ the class completed

  //clear completed deletes only items with class commplte
  // app.delete('/clearCompleted', (req, res) => {
  //
  //   db.collection('todos').deleteMany({completed:true},
  //     (err, result) => {
  //       // console.log('result', result)
  //       if (err) return res.send(500, err)
  //       res.send('Message deleted!')
  //       //db.close();
  //     })
  //   })

    // app.delete('/clearAll', (req, res) => {
    //
    //   db.collection('todos').deleteMany({},
    //     (err, result) => {
    //       console.log('clear all')
    //       if (err) return res.send(500, err)
    //       res.send('Messages deleted!')
    //       //db.close();
    //     })
    //   })

      // deleting an img and story
      app.delete('/stories', (req, res) => {
        console.log("image", req.body.img, "passage",req.body.story)
        db.collection('quotes').findOneAndDelete({image: req.body.img}, (err, result) => {
          if (err) return res.send(500, err)
          console.log("result",result ,"err",err);
          res.send({message:'Message deleted!'})
        })
      })

      // app.delete('/stories', (req, res) => {
      //   console.log("image", req.body.img, "passage",req.body.story)
      //   db.collection('quotes').findOneAndDelete({image: req.body.img, passage: req.body.story}, (err, result) => {
      //     if (err) return res.send(500, err)
      //     console.log("result",result ,"err",err);
      //     res.send({message:'Message deleted!'})
      //   })
      // })
