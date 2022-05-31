var express = require('express');
var router = express.Router();

var objectId = require('mongodb').ObjectId;


var db = require('../db');
const content = db.collection("content");
const likeCollection = db.collection("like");
const topicCollection = db.collection("topic");

/* GET home page. */
router.post('/', function (req, res) {
  const body = req.body;
  let where_var = { parentId: '' };
  const last_id = body.id;
  if (last_id) {
    where_var._id = { "$lt": objectId(last_id) };
  }
  const topic = body.topic;
  if (topic!=null) {
    where_var.topics =  topic ;
  }
  const note = body.note;
  if (note!=null) {
    where_var.note =  note ;
  }
  console.log(where_var);
  content.find(where_var).limit(20).sort({ _id: -1 }).toArray(function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});

router.post('/submit', function (req, res) {
  const data = req.body;
  const message = data.content.trim();
  let errorMsg = "";
  if(data.note != null ){
    const noteDirective = 'sprayer_admin_note';
    const index = message.indexOf(noteDirective);
    if(index == -1){
      errorMsg = "use admin token pls";
      res.status(500).send(errorMsg);
      return;
    }else{
      data.content = message.slice(noteDirective.length,message.length);
    }
  }
  if (message.length >= 120) {
    errorMsg = "Message more than 120";
    res.status(500).send(errorMsg);
    return;
  }
  if (message.length == 0) {
    errorMsg = "Message is Empty";
    res.status(500).send(errorMsg);
    return;
  }
  const imgs = data.imgs;
  if (imgs.length > 9) {
    errorMsg = "Pictures more than 9";
    res.status(500).send(errorMsg);
    return;
  }

  content.insertOne(data, (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });

});

router.get('/get', function (req, res) {
  const id = req.query.id;
  console.log("id:" + id);
  content.findOne({ _id: objectId(id) }).then(result => {
    console.log(result);
    res.status(200).json(result);
  });
})

router.get('/getByParentId', (req, res) => {
  const id = req.query.id;
  console.log("id:" + id);
  content.find({ parentId: id }).sort({ _id: -1 }).toArray((err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
})

router.get('/countComment', (req, res) => {
  const id = req.query.id;
  content.count({ parentId: id }).then(result => {
    res.status(200).json(result);
  })
})

router.get('/like', (req, res) => {
  const id = req.query.id;
  likeCollection.findOne({ contentId: id }).then(result => {
    if (result) {
      ++result.sum;
      likeCollection.updateOne({ _id: result._id }, { $set: { "sum": result.sum } }, (err, updateRes) => {
        if (err) throw err;
        res.status(200).json(updateRes.sum);
      });
    } else {
      likeCollection.insertOne({
        contentId: id,
        sum: 1
      }).then(result => {
        res.status(200).json(result.sum);
      });
    }
  });
})

router.get('/getLike', (req, res) => {
  const id = req.query.id;
  likeCollection.findOne({ contentId: id }).then(result => {
    let sum = 0;
    if (result) {
      sum = result.sum;
    }
    res.status(200).json(sum);
  });
})

router.get('/getTopicTop',(req,res) => {
  topicCollection.find().limit(10).sort({ trends: -1 }).toArray(function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});

router.get('/topic',(req,res) =>{
  const topic = req.query.topic;
  console.log('topic:',topic);
  topicCollection.findOne({name: topic}).then(result =>{
    console.log(result);
    if(result){
      result.trends++;
      const updateResult = topicCollection.updateOne({ name: result.name }, { $set: { "trends": result.trends } });
      updateResult.catch(err=>{
        console.log(err);
      })
    }
    res.sendStatus(200);
  })
});

router.post('/insertTopic', (req, res) => {
  const topics = req.body;
  if (topics != null && topics.length > 0) {
    var index;
    for (index in topics) {
      const topic = topics[index];
      topicCollection.findOne({ name: topic }).then(result =>{
        if (result) {
          result.trends++;
          console.log(result);
          const updateResult = topicCollection.updateOne({ name: result.name }, { $set: { "trends": result.trends } });
          updateResult.catch(err=>{
            console.log(err);
          })
        } else {
          const insertResult = topicCollection.insertOne({
            name: topic,
            trends: 1
          });
          insertResult.catch(err =>{
            console.log(err);
          })
        }
      });
    }
    res.sendStatus(200);
  }
})

module.exports = router;
