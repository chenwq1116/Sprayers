var express = require('express');
var router = express.Router();

var db = require('../db');
const likeCollection = db.collection("like");

router.get('/', (req, res) => {
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
  
  
  module.exports = router;