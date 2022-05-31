var express = require('express');
var router = express.Router();

var db = require('../db');
const topicCollection = db.collection("topic");


router.get('/getTopicTop',(req,res) => {
    topicCollection.find().limit(10).sort({ trends: -1 }).toArray(function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
  });
  
router.get('/',(req,res) =>{
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