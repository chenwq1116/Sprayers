var express = require('express');
var router = express.Router();

var objectId = require('mongodb').ObjectId;


var db = require('../db');
const content = db.collection("content");
/* GET home page. */
router.post('/', function (req, res) {
  const body = req.body;
  let where_var = { parentId: '' };
  const last_id = body.id;
  if (last_id) {
    where_var._id = { "$lt": objectId(last_id) };
  }
  const topic = body.topic;
  if (topic != null) {
    where_var.topics = topic;
  }
  const note = body.note;
  if (note != null) {
    where_var.note = note;
  }
  console.log(where_var);
  content.find(where_var).limit(6).sort({ _id: -1 }).toArray(function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});

router.post('/submit', function (req, res) {
  const data = req.body;
  console.log(data);
  const message = data.content.trim();
  let errorMsg = "";
  if (data.note != null) {
    const noteDirective = 'sprayer_admin_note';
    const index = message.indexOf(noteDirective);
    if (index == -1) {
      errorMsg = "use admin token pls";
      res.status(500).send(errorMsg);
      return;
    } else {
      data.content = message.slice(noteDirective.length, message.length);
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
    res.status(200).json(result);
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

router.get('/countDocments',(req, res) =>{
  content.countDocuments({}).then(result =>{
    res.status(200).json(result);
  })
})

router.get('/delete', (req, res) => {
  const id = req.query.id;
  content.findOne({ _id: objectId(id) }).then(result => {
    const nowDate = new Date();
    const createDate = new Date(result.createDate);
    const expireTime = nowDate.getTime() - createDate.getTime();
    if (result != null && expireTime < 1000 * 60 * 3) {
      content.deleteOne({ _id: objectId(result._id) }).then(resdel => {
        if (resdel) {
          res.sendStatus(200);
        }
      });
    } else {
      const error = 'More than expired time 3min!'
      res.status(500).send(error);
    }
  })
})


module.exports = router;