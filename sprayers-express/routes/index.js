var express = require('express');
var router = express.Router();

var objectId = require('mongodb').ObjectId;


var db = require('../db');
const content = db.collection("content");
const likeCol = db.collection("like");

/* GET home page. */
router.get('/', function(req, res) {
  let where_var = {parentId:''};
  const last_id = req.query.id;
  if(last_id){
    where_var = {parentId:'',_id:{ "$lt" :objectId(last_id)}};
  }
  console.log(where_var);
  content.find(where_var).limit(20).sort({ _id: -1 }).toArray(function(err,result){
    if (err) throw err;
    res.status(200).json(result);
  });
});

router.post('/submit',function(req,res){
  const data = req.body;
  const message = data.content.trim();
  const imgs = data.imgs;
  let errorMsg = "";
  if(message.length >= 120){
    errorMsg = "Message more than 120";
    res.status(500).send(errorMsg);
    return;
  }
  if(message.length == 0){
    errorMsg = "Message is Empty";
    res.status(500).send(errorMsg);
    return;
  }
  if(imgs.length > 9){
    errorMsg = "Pictures more than 9";
    res.status(500).send(errorMsg);
    return;
  }
  
  content.insertOne(req.body,(err,result) =>{
    if (err) throw err;
    res.sendStatus(200);
  });
  
});

router.get('/get',function(req,res){
  const id = req.query.id;
  console.log("id:"+id);
  content.findOne({_id:objectId(id)}).then(result =>{
    console.log(result);
    res.status(200).json(result);
  });
})

router.get('/getByParentId',(req,res) =>{
  const id = req.query.id;
  console.log("id:"+id);
  content.find({parentId:id}).sort({ _id: -1 }).toArray((err,result) =>{
    if (err) throw err;
    res.status(200).json(result);
  });
})

router.get('/countComment',(req,res)=>{
  const id = req.query.id;
  content.count({parentId:id}).then(result =>{
    res.status(200).json(result);
  })
})

router.get('/like',(req,res)=>{
  const id = req.query.id;
  likeCol.findOne({contentId:id}).then(result =>{
    if(result){
      ++result.sum;
      likeCol.updateOne({_id:result._id},{$set:{"sum":result.sum}},(err,updateRes) =>{
        if (err) throw err;
        res.status(200).json(updateRes.sum);
      });
    }else{
      likeCol.insertOne({
        contentId: id,
        sum: 1
      }).then(result =>{
        res.status(200).json(result.sum);
      });
    }
  });
})

router.get('/getLike',(req,res) =>{
  const id = req.query.id;
  likeCol.findOne({contentId:id}).then(result =>{
    let sum = 0;
    if(result){
      sum = result.sum;
    }
    res.status(200).json(sum);
  });
})

module.exports = router;
